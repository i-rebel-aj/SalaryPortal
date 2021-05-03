const express=require("express")
const router=express.Router();
const {addUser, renderRegisterationPage,viewleaves,leave}=require('../controllers/admin')
const {viewAllDepartment, viewDepartmentForm, addDepartment}=require('../controllers/department')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
const {viewInstituteEmployeeInfo, viewAllInstituteEmployees}=require('../controllers/employee')
const {addEmployeeSalaryInfo, renderAddSalaryInfoForm, addAllowancesToEmployee, renderEmployeeSalaryInfo}=require('../controllers/Institute')
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
/*
    @Route  POST  /employeeinfo/:id/allowance
    @Desc   For admin to add employee allowances
    @Access Private
*/
router.post('/employeeinfo/:id/allowance', [isLoggedIn, isAdmin],addAllowancesToEmployee)
/*
    @Route  POST  /admin/employee/leaves
    @Desc   For admin to accept / reject employee leaves
    @Access Private
*/
router.post('/employee/leave',[isLoggedIn, isAdmin], leave)
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
    @Route  GET  /admin/employee
    @Desc   For admin to view all employees
    @Access Private
*/
router.get('/employee',[isLoggedIn, isAdmin], viewAllInstituteEmployees)
/*
    @Route  GET  /admin/employee/leaves
    @Desc   To Admin to add employee
    @Access Private
*/
router.get('/employee/leaves',[isLoggedIn, isAdmin], viewleaves)
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
router.get('/addemployeeinfo', [isLoggedIn, isAdmin], renderAddSalaryInfoForm)
/*
    @Route  GET  /admin/addemployeeinfo/:id/alowance
    @Desc   To View add add Allowance form
    @Access Private
*/
router.get('/addemployeeinfo/:id/allowance', [isLoggedIn, isAdmin], (req, res)=>{
    res.render('./admin/addAllowanceForm', {employeeInfoId: req.params.id})
})
/*
    @Route  GET  /admin/employeeinfo
    @Desc   To View employeeinfos tabulated
    @Access Private
*/
router.get('/employeeinfo', [isLoggedIn, isAdmin], viewInstituteEmployeeInfo)
/*
    @Route  GET  /admin/employeeinfo
    @Desc   To View employee salary info by employee
    @Access Private
*/
router.get('/employeeinfo/:id', [isLoggedIn, isAdmin], renderEmployeeSalaryInfo)
module.exports=router