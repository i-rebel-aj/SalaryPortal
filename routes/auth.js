const express=require("express")
const router=express.Router();
const {addUser, userLogin, logout, editUser}=require('../controllers/auth')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')

/*===============================
    All POST routes goes here
=================================*/
/*
 @Route POST /user/auth/signup
 @Desc Adds a user to DB
 @Access Public
*/
router.post('/signup', addUser)
/*
 @Route POST /user/auth/login
 @Desc Logins a user
 @Access Public
*/
router.post('/login', userLogin)

router.post('/logout', isLoggedIn,logout)
// router.get('/edit', isLoggedIn, (req, res)=>{
//     res.render('userprofile')
// })


/*===============================
    All GET routes goes here
=================================*/
/*
 @Route GET /user/auth/login
 @Desc Display login page
 @Access Public
*/
router.get('/login', (req, res)=>{
    res.render('../views/admin/adminhome')
})
/*
  @Route GET /user/auth/signup
  @Desc Display Signup Page
  @Access Public
*/
// router.get('/signup', (req,res)=>{
//     res.render('signup')
// })

module.exports=router