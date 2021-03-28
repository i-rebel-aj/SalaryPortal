const { User, Faculty, Admin } = require("../models/User");


//To add the user to the Database 
exports.addUser = async (req, res) => {
  console.log('Request comming here')
  const type = req.body.Type
  const email = req.body.email
  const pass=req.body.password
  const name=req.body.name
  const confirmpass=req.body.confirmpass
  const gender= req.body.gender
  const collegeName= req.body.collegeName
  if(pass!==confirmpass){
    //   req.flash('error', 'Passwords do not match')
    //   res.redirect('/user/auth/signup')
    res.status(400).json({message: 'Passwords do not match'})
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
            res.status(200).json({message: 'You are successfully Signed up and sessions has been set'})
            // req.flash("success", "You are now signed in");
            // res.redirect("/");
        }
        //Backend logic for other types goes here
        // else if(type==='Admin'){
           
        //     //Setting Up the session
        //     req.session.isLoggedIn = true;
        //     req.session.user = admin;
        //     res.status(200).json({message: 'You are successfully Signed up and sessions has been set'})
        //     //req.flash("success", "You are now signed in");
        //     //res.redirect("/");
        // }
        else{
            res.status(400).json({message: 'Designation not selected'})
            // req.flash("error", "Designation not selected");
            // res.redirect("/user/auth/signup");
        }
      }catch(err){
          //Handle Errors
          console.log(err)
          res.status(500).json({message: 'Something went wrong', err: err})
          //Explain code 11000 here
            // if (err.code === 11000) {
            //     if (err.keyValue.email) {
            //         req.flash("error", "Email already exists")
            //         res.redirect('/user/auth/signup')
            //     }
            //   }
            //   res.redirect('/error')
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
}