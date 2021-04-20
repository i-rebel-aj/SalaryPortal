const { User, Faculty, Admin } = require("../models/User");
const Superuser=require('../models/Superuser')
const Institute = require('../models/Institute')
//To add the user to the Database 

//One time use only
exports.superUserLogin=async (req, res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const user = await Superuser.findOne({ email: email });
        if (!user||!user.authenticate(pass)) {
             req.flash("error", "Invalid username or pass");
             res.redirect("/superuser/login");
            //return res.status(400).json({message: 'Invalid username or password'})
        } else {
            req.flash("success", "You are now signed in");
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect("/superuser");
            //return res.status(200).json({message: 'Logged in Success'})
        }
      } catch (err) {
        //console.log(err)
        res.redirect('/error');
      }
}
exports.addSuperUser=async (req, res)=>{
    try{
        const {email, name, password}=req.body
        const superUser={
            email: email,
            name: name,
            password: password
        }
        const newSuperUser= new Superuser(superUser)
        await newSuperUser.save()
        return res.status(200).json({message: 'Super User added Success'})
    }catch(err){
        console.log(err)
        return res.status(422).json({message: 'Server Error'})
    }
}
 exports.displayAddAdminForum= async (req, res)=>{
    try{
        const allInstitues= await Institute.find({})
        res.render('./superuser/addAdminForm', {institutes: allInstitues})
    }catch(err){
        req.flash('error', `Something Went wrong ${err.message}`)
        res.redirect('/superuser')
    }
 }