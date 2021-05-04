const Institute = require('../models/Institute')
const { User } = require('../models/User')
const {getDesignationInfoById}=require('../lib/employeeValidator')
//Controller to view all employee info and rules in tabular form 
exports.viewInstituteEmployeeInfo= async (req, res)=>{
    try{
        const instituteId= req.session.user.institute
        const foundInstitute= await Institute.findById(instituteId).populate('employeeInfo.department', 'departmentName')
        res.render('./admin/viewEmployeeInfo', {employees:foundInstitute.employeeInfo})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.viewAllInstituteEmployees= async (req, res)=>{
    try{
        const foundUsers= await User.find({ $or:[{institute: req.session.user.institute, Type: 'Staff'}, {institute: req.session.user.institute, Type: 'Faculty'}, {institute: req.session.user.institute, Type: 'Management'}]}).populate('department', 'departmentName')
        const foundInstitute= await Institute.findById(req.session.user.institute)
        if(!foundInstitute.employeeInfo){
            throw new Error('Admin requested to add Employee Info\'s First')
        }
        for (const user of foundUsers) {
            user.designation=getDesignationInfoById(foundInstitute.employeeInfo, user.designationId)
        }
        console.log(foundUsers)
        res.render('./admin/viewAllEmployees', {employees: foundUsers})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.renderEmployeeSalaryCompletePage= async(req, res)=>{
    ///admin/employee/<%=employee._id%>/salary
    try{
        const foundUser=await User.findById(req.params.id)
        // console.log(foundUser)
        res.render('./admin/viewUserSalary', {salaryInfo: foundUser.salaryInfo, employeeId : foundUser._id})
    }catch(err){
        console.log(err)
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
//To Poulate Salary Details
exports.generateSalary= async(req, res)=>{
    try{
        const foundUser=await User.findById(req.params.id)
        console.log(`Enroll date is ${foundUser.enrolledDate} and type is ${typeof(foundUser.enrolledDate)}`)
        const foundInstitute= await Institute.findById(req.session.user.institute)
        if(!foundInstitute.employeeInfo){
            throw new Error('Admin requested to add Employee Info\'s First')
        }
        const designationInfo=getDesignationInfoById(foundInstitute.employeeInfo, foundUser.designationId)
        const presentDate=new Date()
        const foundingDate=new Date(foundUser.enrolledDate)
        let nextDate=new Date(foundUser.enrolledDate)
        nextDate.setMonth(nextDate.getMonth() + 1)
        if(nextDate>presentDate){
            throw new Error('Employee hasn\'t worked for even a month yet')
        }
        console.log(presentDate)
        while(presentDate.getTime()>nextDate.getTime()){
            console.log(`Next Date is ${nextDate} and founding is ${foundingDate}`)
            let salaryInfo={
                to: nextDate,
                from: foundingDate,
                isPaid: false,
                isGenerated: true,
                taxDeduction:designationInfo.taxRateOnBase,
                //Allowances to be included later
                totalAmountSettled: (designationInfo.annualbasePay/12)*(1-designationInfo.taxRateOnBase/100)
            }
            console.log(salaryInfo)
            foundingDate.setMonth(foundingDate.getMonth()+1)
            nextDate.setMonth(nextDate.getMonth()+1)
            foundUser.salaryInfo.push(salaryInfo)
            await foundUser.save()
        }
        console.log(foundUser)
        //await foundUser.save()
        req.flash('success', 'Salary Generated for the employee')
        res.redirect(`/admin/employee/${req.params.id}/salary`)
    }catch(err){
        console.log(err)
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.markPaid=async(req, res)=>{
    try{
        const {employeeId, salaryId}=req.params
        const {remarks}=req.body
        const fileInfo={}
        fileInfo.name=req.file.originalname
        fileInfo.path=req.file.path
        fileInfo.mime_type= req.file.mimetype
        let str=req.file.mimetype
        str=str.replace('/', ' ')
        str=str.split(' ')
        fileInfo.file_type=str[0]
        console.log(fileInfo)
        const foundUser=await User.findById(employeeId)
        for (const salary of foundUser.salaryInfo) {
            if(salary._id.toString()===salaryId.toString()){
                let paymentInfo={
                    fileInfo: fileInfo,
                    remarks: remarks
                }
                salary.isPaid=true
                salary.paymentReceipts.push(paymentInfo)
                await foundUser.save()
            }
        }
        req.flash('success', 'Salary Paid for the employee')
        res.redirect(`/admin/employee/${employeeId}/salary`)
    }catch(err){
        console.log(err)
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
//For Regular Employees
exports.viewLoggedInUserSalary= async(req, res)=>{
    try{
        res.render('./faculty/viewAllSalary', {salaryInfo: req.session.user.salaryInfo})
    }catch(err){
        console.log(err)
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/faculty')
    }
}
exports.viewSalaryById= async(req, res)=>{
    try{
        let foundSalary={}
        for (const salary of req.session.user.salaryInfo) {
            if(salary._id.toString()===req.params.id){
                foundSalary=salary
            }
        }
        res.render('./faculty/viewSalaryBreakdown', {salary: foundSalary})
    }catch(err){
        console.log(err)
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/faculty')
    }
}