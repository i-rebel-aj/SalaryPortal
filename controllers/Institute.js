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
        return res.status(200).json({message: 'Institute Added Successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Something went wrong', err: err})
    }
}
exports.assignInstituteAdmin= async(req, res)=>{
    try{
        const {email}= req.body
        const foundinstitute=await Institute.findById(req.params.id)
        const foundUser= await User.findOne({email: email})
        //Make sure that admin already doesnt exist
        if(foundinstitute.assignedAdmin){
            throw new Error('Admin already exists')
        }
        if(foundUser.Type!=='Admin'){
            throw new Error('This user can\'t be made into admin')
        }
        console.log(`foundUser.institite ${foundUser.institute}`)
        if(foundUser.institute!==req.params.id){
            throw new Error('This user is not the member of this institute')
        }
        foundinstitute.assignedAdmin= foundUser._id
        await foundinstitute.save()
        return res.status(200).json({message: 'Assigned Admin success'})
    }catch(err){
        return res.status(500).json({message: 'Server Error', error: err})
    }
}
exports.getAllInstitutes= async(req, res)=>{
    try{
        const allInstitues= await Institute.find({})
        return res.status(200).json({instituteList: allInstitues})
    }catch(err){
        return res.status(500).json({message: 'Server Error', err: err})
    }
}