const { User, Faculty, Admin } = require("../models/User");
const Institute = require('../models/Institute')
//To add the user to the Database 
exports.addInstituteAdmin = async (req, res) => {
  const type = req.body.Type
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
        if(foundInstitute.assignedAdmin&&foundInstitute.assignedAdmin!==null){
          throw new Error('Admin already exists')
        }
        if(type==='Admin'){
            const newAdmin={
                email: email, 
                password: pass, 
                name: name,
                gender: gender,
                institute: foundInstitute._id
            }   
            const admin=new Admin(newAdmin)
            await admin.save()
            return res.status(200).json({message: 'You are successfully Signed up'})
            //req.flash("success", "You are now signed in");
            //res.redirect("/");
        }
        else{
            return res.status(400).json({message: 'Designation can be Admin Only'})
            // req.flash("error", "Designation not selected");
            // res.redirect("/user/auth/signup");
        }
      }catch(err){
          //Handle Errors
          console.log(err)
          //Explain code 11000 here
            if (err.code === 11000) {
                if (err.keyValue.email) {
                    // req.flash("error", "Email already exists")
                    // res.redirect('/user/auth/signup')
                    return res.status(500).json({message: 'Email already exists', err: err})
                }
            }
            return res.status(500).json({message: 'Server Error', err: err})
        } 
    }
}