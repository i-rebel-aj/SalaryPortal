const { User, Faculty, Admin } = require("../models/User");
const bcrypt = require("bcrypt");


//To add the user to the Database 
exports.addUser = async (req, res) => {
  const type = req.body.Type
  const email = req.body.email
  const pass=req.body.password
  const name=req.body.name
  const confirmpass=req.body.confirmpass
  const gender= req.body.gender
  const collegeName= req.body.collegeName
  if(pass!==confirmpass){
      req.flash('error', 'Passwords do not match')
      res.redirect('/user/auth/signup')
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
                enrolledDate: req.body.enrolledDate
            }
            const faculty=new Faculty(newfaculty)
            await faculty.save()
            req.session.isLoggedIn = true;
            req.session.user = faculty;
            req.flash("success", "You are now signed in");
            res.redirect("/");
        }else if(type==='Admin'){
            const newAdmin = {email :  email, password: pass, name: name, gender: gender, collegeName: collegeName}
            const admin=new Admin(newAdmin)
            await admin.save()
            //Setting Up the session
            req.session.isLoggedIn = true;
            req.session.user = admin;
            req.flash("success", "You are now signed in");
            res.redirect("/");
        }else{
            req.flash("error", "Designation not selected");
            res.redirect("/user/auth/signup");
        }
      }catch(err){
          //Handle Errors
          console.log(err)
          //Explain code 11000 here
        if (err.code === 11000) {
            if (err.keyValue.email) {
                req.flash("error", "Email already exists")
                res.redirect('/user/auth/signup')
            }
          }
          res.redirect('/error')
        }
      }
}

exports.userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user||!user.authenticate(pass)) {
        req.flash("error", "Invalid username or pass");
        res.redirect("/user/auth/login");
    } else {
        req.flash("success", "You are now signed in");
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect("/");
      
    }
  } catch (err) {
    //console.log(err)
    res.redirect('/error');
  }
};

// exports.editUser = async (req, res)=>{
//     const user= await User.findById(req.session.user._id)
//     if(req.body.name){
//         user.name= req.body.name
//     }
//     if(req.body.email){
//         user.email= req.body.email
//     }
//     await user.save()
//     req.session.user = user;
//     req.flash('success', 'Details added successfully')
//     res.redirect('back')
// }


exports.logout = async(req,res)=>{
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                res.redirect('/error')
            } else {
                req.session=null
                res.redirect('/');
            }
        });
    }
};