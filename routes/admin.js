const express=require("express")
const router=express.Router();
const {addUser, renderRegisterationPage}=require('../controllers/admin')
const {viewAllDepartment, viewDepartmentForm, addDepartment}=require('../controllers/department')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
const {viewInstituteEmployeeInfo}=require('../controllers/employee')
const {addEmployeeSalaryInfo}=require('../controllers/Institute')
/*===============================
    All POST routes goes here
=================================*/
/*
    @Route  POST  /admin/adduser
    @Desc   For admin to add user
    @Access Private
*/
router.post('/adduser',[isLoggedIn, isAdmin], addUser)
/*
    @Route  POST  /admin/department
    @Desc   For admin to add a new department
    @Access Private
*/
router.post('/department', [isLoggedIn, isAdmin], addDepartment)
/*
    @Route  POST  /admin/employeeinfo
    @Desc   For admin to add a employee salary info
    @Access Private
*/
router.post('/employeeinfo', [isLoggedIn, isAdmin], addEmployeeSalaryInfo)
/*===============================
    All GET routes goes here
=================================*/
/*
    @Route  GET  /admin
    @Desc   To Admin to view his home page
    @Access Private
*/
router.get('/',[isLoggedIn, isAdmin], (req, res)=>{
    res.render('./admin/adminhome')
})
/*
    @Route  GET  /admin/addemployee
    @Desc   To Admin to add employee
    @Access Private
*/
router.get('/addemployee',[isLoggedIn, isAdmin], renderRegisterationPage)
/*
    @Route  GET  /admin/employee/leaves
    @Desc   To View all employee
    @Access Private
*/
router.get('/employee/leaves',[isLoggedIn, isAdmin], (req, res)=>{
    res.render('./admin/viewleaves')
})

/*
    @Route  GET  /admin/employee/leaves
    @Desc   To Admin to add employee
    @Access Private
*/
router.get('/employee/leaves',[isLoggedIn, isAdmin], (req, res)=>{
    res.render('./admin/viewleaves')
})
/*
    @Route  GET  /admin/adddepartment
    @Desc   To View add department form
    @Access Private
*/
router.get('/adddepartment', [isLoggedIn, isAdmin], viewDepartmentForm)
/*
    @Route  GET  /admin/department
    @Desc   To View department
    @Access Private
*/
router.get('/department', [isLoggedIn, isAdmin], viewAllDepartment)
/*
    @Route  GET  /admin/addemployeeinfo
    @Desc   To View add addemployeeinfo form
    @Access Private
*/
router.get('/addemployeeinfo', [isLoggedIn, isAdmin], (req, res)=>{
    res.render('./admin/addEmployeeSalaryInfo')
})
/*
    @Route  GET  /admin/employeeinfo
    @Desc   To View employeeinfos tabulated
    @Access Private
*/
router.get('/employee/info', [isLoggedIn, isAdmin], viewInstituteEmployeeInfo)
module.exports=router