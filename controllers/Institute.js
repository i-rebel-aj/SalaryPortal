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
    }
    catch(err){
        res.status(500).json({message: 'Something went wrong', err: err})
    }
}
exports.assignInstituteAdmin= async(req, res)=>{
    try{
        const {instituteName, email}= req.body
        const foundinstitute=await Institute.findOne({instituteName: instituteName})
        const foundUser= await User.findOne({email: email})
        //Make sure that admin already doesnt exist
        if(foundinstitute.assignedAdmin){
            throw new Error('Admin already exists')
        }
        if(foundUser.Type!=='Admin'){
            throw new Error('This user can\'t be made into admin')
        }
        foundinstitute.assignedAdmin= foundUser._id
        await foundinstitute.save()
        return res.status(200).json({message: 'Assigned Admin success'})
    }catch(err){
        return res.status(500).json({message: 'Server Error', error: err})
    }
}