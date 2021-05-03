const { Department } = require('../models/Department');
const Institute = require('../models/Institute')
const {User,Admin} = require("../models/User");
/*=========================
Goes to Super Admin ONLY
==========================*/
exports.addInstitute=async (req, res)=>{
    try{
        const newInstitute={
            instituteName: req.body.instituteName
        }
        const institute= new Institute(newInstitute)
        await institute.save()
        req.flash('success', 'Institute added Success')
        res.redirect('/superuser')
    }
    catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/superuser')
    }
}
exports.getAllInstitutes= async(req, res)=>{
    try{
        const allInstitues= await Institute.find({}).populate('assignedAdmin', 'name email')
        console.log(allInstitues)
        res.render('./superuser/viewAllInstitute', {institutes: allInstitues})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/superuser')
    }
}

exports.addInstituteAdmin = async (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const pass=req.body.password
    const name=req.body.name
    const confirmpass=req.body.confirmpass
    const gender= req.body.gender
    const instituteName= req.body.instituteName
    if(pass!==confirmpass){
      return res.status(400).json({message: 'Passwords do not match'})
    }else{
        try{
          const foundInstitute= await Institute.findOne({instituteName: instituteName})
          if(!foundInstitute){
              throw new Error('Institute Not Found')
          }
          if(typeof(foundInstitute.assignedAdmin)!=='undefined'&&foundInstitute.assignedAdmin!==null){
            throw new Error('Admin already exists')
          }
          const newAdmin={
              email: email, 
              password: pass, 
              name: name,
              gender: gender,
              institute: foundInstitute._id
          } 
          //Saving Admin to DB  
          const admin=new Admin(newAdmin)
          await admin.save()
          //Dangerous Operation
          foundInstitute.assignedAdmin=admin._id
          await foundInstitute.save()
          req.flash("success", "Admin Added Success, please assign him");
          res.redirect("/superuser");
        }catch(err){
            //Handle Errors
            req.flash('error', `Something Went wrong ${err.message}`)
            res.redirect('/superuser')
          } 
      }
  }

//For Admin
exports.addEmployeeSalaryInfo= async (req, res)=>{
    const {employeeType, designationName, department, stipedCurrency, annualbasePay, paidLeavesPermitted, taxRateOnBase}=req.body
    try{
        const instituteId= req.session.user.institute
        const foundInstitute= await Institute.findById(instituteId)
        const employeeInfo={
            employeeType: employeeType,
            designationName: designationName,
            department: department,
            stipedCurrency: stipedCurrency,
            annualbasePay: annualbasePay,
            paidLeavesPermitted: paidLeavesPermitted,
            taxRateOnBase: taxRateOnBase
        }
        foundInstitute.employeeInfo.push(employeeInfo)
        await foundInstitute.save()
        req.flash('success', 'Info added Success')
        res.redirect('/admin')
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.renderAddSalaryInfoForm= async (req, res)=>{
    try{
        const foundDepartment=await Department.find({associatedInstituteId: req.session.user.institute})
        res.render('./admin/addEmployeeSalaryInfo', {departments: foundDepartment})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.addAllowancesToEmployee= async (req, res)=>{
    try{
        const {allowanceName, allowanceAmount, allowanceInfo}=req.body
        const allowanceObjectid=req.params.id
        const foundInstitute= await Institute.findById(req.session.user.institute)
        //Improve logic here if you can
        // await user.find( { $or: [ { instutute: <>,  type: 'Faculty' },{ instutute: <>,  type: 'Staff' }] })
        let allowance={
            allowanceName:allowanceName,
            allowanceAmount: allowanceAmount,
            allowanceInfo: allowanceInfo
        }
        for (const employeeInfo of foundInstitute.employeeInfo) {
            if(employeeInfo._id.toString()===allowanceObjectid.toString()){
                employeeInfo.annualAllowances.push(allowance)
            }
        }
        await foundInstitute.save()
        req.flash('success', 'Info added Success add more if you like')
        res.redirect('/admin/employeeinfo')
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.renderEmployeeSalaryInfo=async (req, res)=>{
    try{
        const foundInstitute= await Institute.findById(req.session.user.institute).populate('employeeInfo.department', 'departmentName')
        const employeeInfoObjectid=req.params.id
        let foundEmployeeSalaryInfo={}
        for (const employeeInfo of foundInstitute.employeeInfo) {
            if(employeeInfo._id.toString()===employeeInfoObjectid.toString()){
                foundEmployeeSalaryInfo=employeeInfo
            }
        }
        console.log(foundEmployeeSalaryInfo)
        res.render('./admin/employeeSalaryInfo', {employee: foundEmployeeSalaryInfo})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}