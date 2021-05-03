const { Faculty, Staff, Management } = require("../models/User")
const {User,Admin} = require("../models/User");
const {Department} = require("../models/Department");
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
            req.flash("success", "Email already exists")
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
    // console.log(req.body)
    const {enrollment,status} = req.body;
    var foundUser = await User.find({employeeID: enrollment});
    console.log(foundUser[0].appliedLeave)
    const leave = foundUser[0].appliedLeave

    const l = leave.length
    for(var i=0;i<l;i++){
        if(foundUser[0].appliedLeave[i].approvedStatus === 'Waiting'){
            foundUser[0].appliedLeave[i].approvedStatus = status
        }
    }
    console.log(foundUser[0].appliedLeave)
    await foundUser.save()
    res.redirect('/admin/employee/leaves')
}

exports.viewleaves = async(req,res)=>{
    // console.log(req.session.user.institute)
    const users = await User.find({ institute: req.session.user.institute,Type: 'Faculty'})
    var waitingLeaves = [];
    for(const user of users){
        const leaves = user.appliedLeave
        for(var i=0;i<leaves.length;i++){
            if(leaves[i].approvedStatus === 'Waiting'){
                var userLeave = {
                    employeeId: user.employeeID,
                    name: user.name,
                    department: user.department,
                    leavesReamaining: 12,
                    subject: leaves[i].leaveReason
                }
                // console.log(user.department)
                waitingLeaves.push(userLeave)
            }
            // console.log(leaves[i].approvedStatus)
        }
    }
    // console.log(waitingLeaves)
    res.render('./admin/viewleaves',{leaves: waitingLeaves})
}