const { Faculty, Staff, Management } = require("../models/User")
const { Department } = require('../models/Department');
const {User,Admin} = require("../models/User");
//Admin Only access
exports.addUser = async (req, res) => {
    console.log(req.body)
  const { type, email, pass, confirmpass, gender, employeeId, department, enrolledDate, designation, retiredStaus, name}=req.body
    if(pass!==confirmpass){
        req.flash('error', 'Passwords do not match')
        res.redirect('/user/auth/signup')
    }else{
        try{
            const newUser={
                email: email, 
                password: pass, 
                name: name,
                gender: gender,
                institute: req.session.user.institute,
                department: department,
                enrolledDate: enrolledDate,
                employeeID: employeeId,
                designation: designation
            }
            if(retiredStaus==='Yes'){
                newUser.retiredStaus=true
            }else if(retiredStaus==='No'){
                newUser.retiredStaus=false
            }
            if(type==='Faculty'){
                const faculty=new Faculty(newUser)
                await faculty.save()
            }else if(type==='Staff'){
                const staff=new Staff(newUser)
                await staff.save()
            }else if(type==='Management'){
                const management=new Management(newUser)
                await management.save()
            }else{
                throw new Error('Invalid Type Selected')
            } 
            req.flash("success", "Employee Added")
            res.redirect('/admin')
        }catch(err){
            console.log(err)
            if (err.code === 11000) {
                if (err.keyValue.email) {
                    req.flash("error", "Email already exists")
                    res.redirect('back')
                }
            }
            req.flash('error', `Something went wrong ${err.message}`)
            res.redirect('back')
        } 
    }
}
exports.renderRegisterationPage=async (req, res)=>{
    try{
        console.log(`Institute Id id ${req.session.user.institute}`)
        const foundDepartment=await Department.find({associatedInstituteId: req.session.user.institute})
        res.render('./admin/registerEmployee', {departments: foundDepartment})
    }catch(err){
        console.log(err)
        res.redirect('/error')
    }
}
exports.leave = async(req, res)=>{
    console.log(req.body)
    const {enrollment,status} = req.body;
    const foundUser=await User.find({employeeId: enrollment});
    foundUser.appliedLeave.find({status : 'Waiting'}).status = status;
    res.redirect('/admin/employee/leaves')
}

exports.viewleaves = async(req,res)=>{
    const users = User.find({})
    for(user in users){
        console.log(user.appliedLeave)   
    }
    res.render('./admin/viewleaves')
}