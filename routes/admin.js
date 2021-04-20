const express=require("express")
const router=express.Router();
const {addUser}=require('../controllers/admin')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
/*===============================
    All POST routes goes here
=================================*/
/*
    @Route  POST  /admin/adduser
    @Desc   For admin to add user
    @Access Private
*/
router.post('/adduser', addUser)
/*===============================
    All GET routes goes here
=================================*/
/*
    @Route  GET  /admin
    @Desc   To Admin to view his home page
    @Access Private
*/
router.get('/', (req, res)=>{
    res.render('./admin/adminhome')
})
/*
    @Route  GET  /admin/addemployee
    @Desc   To Admin to add employee
    @Access Private
*/
router.get('/addemployee',(req, res)=>{
    res.render('./admin/registerFaculty')
})
/*
    @Route  GET  /admin/employee/leaves
    @Desc   To View all employee
    @Access Private

*/
router.get('/employee/leaves', (req, res)=>{
    res.render('./admin/viewleaves')
})

/*
    @Route  GET  /admin/employee/leaves
    @Desc   To Admin to add employee
    @Access Private

*/
router.get('/employee/leaves', (req, res)=>{
    res.render('./admin/viewleaves')
})
module.exports=router