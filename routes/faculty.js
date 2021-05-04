const express=require("express")
const router=express.Router();
const {applyforleave,profile}=require('../controllers/leave')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
/*===============================
    All POST routes goes here
=================================*/

/*
    @Route  POST  /faculty
    @Desc   For Faculty to Apply For Leave
    @Access Private
*/
router.post('/applyleave', [isLoggedIn, isFaculty], applyforleave)
/*===============================
    All GET routes goes here
=================================*/
/*
    @Route  GET  /faculty
    @Desc   To Faculty to view his home page
    @Access Private
*/

router.get('/',[isLoggedIn, isFaculty], (req, res)=>{
    res.render('./faculty/facultyhome')
})

/*
    @Route  GET  /faculty/applyleave
    @Desc   Form to Faculty to Apply For Leave
    @Access Private
*/
router.get('/applyleave',[isLoggedIn, isFaculty], (req, res)=>{
    res.render('./faculty/applyleave')
})

/*
    @Route  GET  /faculty/applyleave
    @Desc   Form to Faculty to Apply For Leave
    @Access Private
*/
router.get('/profile',[isLoggedIn, isFaculty],profile)


module.exports=router