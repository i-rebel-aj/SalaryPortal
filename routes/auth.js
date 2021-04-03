const express=require("express")
const router=express.Router();
const {userLogin, logout}=require('../controllers/auth')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')

/*===============================
    All POST routes goes here
=================================*/
/*
 @Route POST /user/auth/login
 @Desc Logins a user
 @Access Public
*/

router.post('/login', userLogin)

/*
 @Route POST /user/auth/logout
 @Desc Logouts a user
 @Access Private
*/

router.post('/logout', isLoggedIn,logout)


/*===============================
    All GET routes goes here
=================================*/

router.get('/login', (req, res)=>{
    res.render('login')
})

module.exports=router