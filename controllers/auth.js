const { User} = require("../models/User");
//To login a user
exports.userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user||!user.authenticate(pass)) {
         req.flash("error", "Invalid username or pass");
         res.redirect("/");
        //return res.status(400).json({message: 'Invalid username or password'})
    } else {
        req.flash("success", "You are now signed in");
        req.session.isLoggedIn = true;
        req.session.user = user;
        console.log(user)
        if(user.Type==='Admin'){
            return res.redirect("/admin")
        }else if(user.Type==='Faculty'){
            return res.redirect('/faculty')
        }else{
            res.redirect('/error')
        }
    }
  } catch (err) {
    res.redirect('/error');
  }
};
//To Logout a User
exports.logout = async(req,res)=>{
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                res.redirect('/error')
            } else {
                req.session=null
                res.redirect('/');
                //return res.status(200).json({message: 'Log out Success'})
            }
        });
    }
}


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
