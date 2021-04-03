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
@Route POST /superadmin
@Access Private
@Desc A superuser can another superuser
*/
router.post('/', addSuperUser)
/*
@Route POST /superadmin/login
@Access Private
@Desc Login for a superuser
*/
router.post('/login', superUserLogin)
/*
@Route POST /superadmin/institute
@Access Private
@Desc A superuser can add another institute
*/
router.post('/insititute', addInstitute)
/*
@Route POST /superadmin/institute/:id/assignadmin
@Access Private
@Desc A superuser can assign Admin to the institute
*/
router.post('/institute/:id/assignadmin', addInstituteAdmin)

/*===============================
    All GET routes goes here
=================================*/
//Display Super user Panel
//Options, 1. Add Institute and Add Institute Admin
// router.get('/', (req, res)=>{
//     res.render('./admin/adminhome')
// })
// router.get('/addemployee',(req, res)=>{
//     res.render('./admin/registerFaculty')
// } )

module.exports=router