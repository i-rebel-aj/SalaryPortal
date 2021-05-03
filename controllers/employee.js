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