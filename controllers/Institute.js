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
    const {employeeType, designationName, department, stipedCurrency, annualbasePay, paidLeavesPermitted}=req.body
    try{
        const instituteId= req.session.user.institute
        const foundInstitute= await Institute.findById(instituteId)
        const foundDepartment= await Department.findOne({departmentName: department})
        const employeeInfo={
            employeeType: employeeType,
            designationName: designationName,
            department: foundDepartment._id,
            stipedCurrency: stipedCurrency,
            annualbasePay: annualbasePay,
            paidLeavesPermitted: paidLeavesPermitted
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