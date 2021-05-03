const Institute = require('../models/Institute')
const { User } = require('../models/User')
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
        console.log(foundUsers)

    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}