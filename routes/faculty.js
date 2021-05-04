const express=require("express")
const router=express.Router();
const {applyforleave,profile}=require('../controllers/leave')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
const {viewLoggedInUserSalary, viewSalaryById}=require('../controllers/employee')
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
    res.render('./faculty/facultyHome')
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
/*
    @Route  GET  /faculty/salary
    @Desc   To view Complete Salary Details of faculty
    @Access Private
*/
router.get('/salary',[isLoggedIn, isFaculty],viewLoggedInUserSalary)
/*
    @Route  GET  /faculty/salary/:id
    @Desc   To view Salary info from Id
    @Access Private
*/
router.get('/salary/:id',[isLoggedIn, isFaculty],viewSalaryById)

module.exports=router