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
exports.assignCollegeAdmin= async(req, res)=>{
    try{
        const email=req.body.adminEmail
        const foundUser= User.findOne({email: email})
        if(!foundUser){
            //Change Details here
            const newAdmin = {email :  email, password: pass, name: name, collegeName: collegeName}
            const admin=new Admin(newAdmin)
            await admin.save()
        }else{
            throw new Error('User already exists')
        }
    }catch(err){

    }
}