const express=require("express")
const router=express.Router();
const {userLogin, logout}=require('../controllers/auth')
const {superUserLogin, addInstituteAdmin, addSuperUser}=require('../controllers/superUser')
const {addInstitute}=require('../controllers/Institute')
const {isSuperuser}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
/*===============================
    All POST routes goes here
=================================*/
/*
    @Route POST /superuser
    @Access Private
    @Desc A superuser can another superuser
*/
router.post('/', addSuperUser)
/*
    @Route POST /superuser/login
    @Access Private
    @Desc Login for a superuser
*/
router.post('/login', superUserLogin)
/*
    @Route POST /superuser/institute
    @Access Private
    @Desc A superuser can add another institute
*/
router.post('/insititute',[isLoggedIn, isSuperuser],addInstitute)
/*
    @Route POST /superuser/institute/:id/assignadmin
    @Access Private
    @Desc A superuser can assign Admin to the institute
*/
router.post('/institute/:id/assignadmin',[isLoggedIn, isSuperuser], addInstituteAdmin)

/*===============================
    All GET routes goes here
=================================*/
/*
    @Route GET /superuser
    @Access Private
    @Desc Display Super User Home Page
*/
router.get('/',[isLoggedIn, isSuperuser], async (req, res)=>{
    res.render('superuser/superUserHome', {isSuperUser: true})
})
/*
    @Route GET /superuser/addinstitute
    @Access Private
    @Desc Render Add Institute Form 
*/
router.get('/addinstitute',[isLoggedIn, isSuperuser], async (req, res)=>{
    res.render('superuser/addInstituteForm', {isSuperUser: true})
})
/*
    @Route GET /superuser/login
    @Access Private
    @Desc Display Super User Login Page
*/
router.get('/login', async (req, res)=>{
    res.render('login', {isSuperUser: true})
})


module.exports=router