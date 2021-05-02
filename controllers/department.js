const {Department}=require('../models/Department')
exports.addDepartment=async (req, res)=>{
    const {departmentName, containsEmployee}= req.body
    try{
        const newDepartment=new Department({departmentName: departmentName, associatedInstituteId: req.session.user.institute})
        if(typeof(containsEmployee)==='string'){
            newDepartment.containsEmployee.push(containsEmployee)
        }else{
            // for (const employeeType of containsEmployee) {
            //     if(newDepartment?containsEmployee){
            //         //To Avoid repetions
            //         if(newDepartment.containsEmployee.indexOf(employeeType)===-1){
            //             newDepartment.containsEmployee.push(employeeType)
            //         }
            //     }else{
            //         newDepartment.containsEmployee.push(employeeType)
            //     }   
            // }
        }
        await newDepartment.save()
        req.flash('success', 'Department Added Success')
        res.redirect('/admin')
    }catch(err){
        req.flash('success', `Something Went Wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.viewAllDepartment=async(req, res)=>{
    try{
        const foundDepartment=await Department.find({associatedInstituteId: req.session.user.institute})
        console.log(foundDepartment)
        res.render('./admin/viewDepartment', {departments: foundDepartment})
    }catch(err){
        req.flash('success', `Something Went Wrong ${err.message}`)
        res.redirect('/admin')
    }
}
exports.viewDepartmentForm= async(req, res)=>{
    res.render('./admin/addDepartmentForm')
}