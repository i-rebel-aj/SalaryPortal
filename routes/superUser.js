const express=require("express")
const router=express.Router();
const {superUserLogin, displayAddAdminForum}=require('../controllers/superUser')
const {addInstitute, getAllInstitutes,addInstituteAdmin}=require('../controllers/Institute')
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
//router.post('/', addSuperUser)
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
router.post('/institute',[isLoggedIn, isSuperuser],addInstitute)
/*
    @Route POST /superuser/admin
    @Access Private
    @Desc A superuser can assign Admin to the institute
*/
router.post('/admin', [isLoggedIn, isSuperuser], addInstituteAdmin)

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
/*
    @Route GET /superuser/login
    @Access Private
    @Desc To Display all institutes
*/
router.get('/institute',[isLoggedIn, isSuperuser], getAllInstitutes)
/*
    @Route GET /superuser/addadmin
    @Access Private
    @Desc To Display add admin form
*/
router.get('/addadmin', [isLoggedIn, isSuperuser], displayAddAdminForum)
module.exports=router