const Institute = require('../models/Institute')
//Controller to view all employee info and rules in tabular form 
exports.viewInstituteEmployeeInfo= async (req, res)=>{
    try{
        const instituteId= req.session.user.institute
        const foundInstitute= await Institute.findById(instituteId)
        res.render('./admin/viewEmployeeInfo', {employees:foundInstitute.employeeInfo})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/admin')
    }
}