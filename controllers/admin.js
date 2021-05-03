const { Faculty, Staff, Management } = require("../models/User")
const { Department } = require('../models/Department');
const {User,Admin} = require("../models/User");
//Admin Only access
exports.addUser = async (req, res) => {
    console.log(req.body)
  const { Type, email, pass, confirmpass, gender, employeeId, department, enrolledDate, designation, retiredStaus, name}=req.body
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
            if(Type==='Faculty'){
                const faculty=new Faculty(newUser)
                await faculty.save()
            }else if(Type==='Staff'){
                const staff=new Staff(newUser)
                await staff.save()
            }else if(Type==='Management'){
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
    const {enrollment,status,leaveId} = req.body;
    let foundUser = await User.findOne({employeeID: enrollment});
    // console.log(foundUser.appliedLeave)
    const leave = foundUser.appliedLeave

    const l = leave.length
    for(let i=0;i<l;i++){
        if(foundUser.appliedLeave[i]._id.toString() === leaveId.toString()){
            foundUser.appliedLeave[i].approvedStatus = status
        }
    }
    // console.log(foundUser.appliedLeave)
    await foundUser.save()
    res.redirect('/admin/employee/leaves')
}

exports.viewleaves = async(req,res)=>{
    // console.log(req.session.user.institute)
    const users = await User.find({ institute: req.session.user.institute,Type: 'Faculty'})
    let waitingLeaves = [];
    for(const user of users){
        const leaves = user.appliedLeave
        let userLeave = {
            employeeId: user.employeeID,
            name: user.name,
            designation: user.designation._id,
            leavesReamaining: 12,
            leaves: leaves
        }
        waitingLeaves.push(userLeave)
    }
    console.log(waitingLeaves)
    res.render('./admin/viewleaves',{allleaves: waitingLeaves})
}