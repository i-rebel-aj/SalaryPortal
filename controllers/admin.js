const { Faculty, Staff, Management } = require("../models/User");
exports.addUser = async (req, res) => {
  console.log('Request comming here')
  const {type, email, pass, confirmpass, gender, instituteName, employeeId, department, enrolledDate, designation, retiredStaus}=req.body
if(pass!==confirmpass){
      req.flash('error', 'Passwords do not match')
      res.redirect('/user/auth/signup')
    //res.status(400).json({message: 'Passwords do not match'})
  }else{
      try{
        if(type==='Faculty'){
            //Hashing the password
            const newfaculty={
                email: email, 
                password: pass, 
                name: name,
                gender: gender,
                collegeName: collegeName,
                department: req.body.department,
                enrolledDate: req.body.enrolledDate,
                enrollmentNumber: req.body.enrollmentNumber
            }
            const faculty=new Faculty(newfaculty)
            await faculty.save()
            req.session.isLoggedIn = true;
            req.session.user = faculty;
            return res.status(200).json({message: 'You are successfully Signed up and sessions has been set'})
            // req.flash("success", "You are now signed in");
            // res.redirect("/");
        }else if(type==='Admin'){
            const newAdmin={
                email: email, 
                password: pass, 
                name: name,
                gender: gender,
                collegeName: collegeName
            }   
            const admin=new Admin(newAdmin)
            await admin.save()
            //Setting Up the session
            req.session.isLoggedIn = true;
            req.session.user = admin;
            return res.status(200).json({message: 'You are successfully Signed up and sessions has been set'})
            //req.flash("success", "You are now signed in");
            //res.redirect("/");
        }
        else{
            return res.status(400).json({message: 'Designation not selected'})
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