const { Faculty, Staff, Management} = require("../models/User")
const { Department } = require('../models/Department');
const {User,Admin} = require("../models/User");
const Institute = require("../models/Institute");
const {getDesignationInfoById}=require('../lib/employeeValidator')
//Admin Only access
exports.addUser = async (req, res) => {
    console.log(req.body)
    const {email, pass, confirmpass, gender, employeeId, enrolledDate, designationId, retiredStaus, name}=req.body
    const foundInstitute= await Institute.findById(req.session.user.institute)
    if(!foundInstitute.employeeInfo){
        throw new Error('Admin requested to add Employee Info\'s First')
    }
    const foundDesignation=getDesignationInfoById(foundInstitute.employeeInfo, designationId)
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
                enrolledDate: enrolledDate,
                employeeID: employeeId,
                designationId: designationId
            }
            if(retiredStaus==='Yes'){
                newUser.retiredStaus=true
            }else if(retiredStaus==='No'){
                newUser.retiredStaus=false
            }
            if(foundDesignation.employeeType==='Faculty'){
                const faculty=new Faculty(newUser)
                await faculty.save()
            }else if(foundDesignation.employeeType==='Staff'){
                const staff=new Staff(newUser)
                await staff.save()
            }else if(foundDesignation.employeeType==='Management'){
                const management=new Management(newUser)
                await management.save()
            }else{
                throw new Error('Invalid Type Selected')
            } 
            req.flash("success", "Employee Added")
            res.redirect('/admin')
        }catch(err){
            console.log(err)
            req.flash('error', `Something went wrong ${err.message}`)
            res.redirect('back')
        } 
    }
}
exports.renderRegisterationPage=async (req, res)=>{
    try{
        console.log(`Institute Id id ${req.session.user.institute}`)
        const foundInstitute= await Institute.findById(req.session.user.institute)
        res.render('./admin/registerEmployee', {designations: foundInstitute.employeeInfo})
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
    const users = await User.find({ institute: req.session.user.institute,Type: 'Faculty'}).populate('department','departmentName')
    let waitingLeaves = [];
    for(const user of users){
        const leaves = user.appliedLeave
        let userLeave = {
            employeeId: user.employeeID,
            name: user.name,
            department: user.departmentName,
            leavesReamaining: 12,
            leaves: leaves
        }
        waitingLeaves.push(userLeave)
    }
    console.log(waitingLeaves)
    res.render('./admin/viewleaves',{allleaves: waitingLeaves})
}