const express=require("express")
const router=express.Router();
const {addUser, renderRegisterationPage,viewleaves,leave}=require('../controllers/admin')
const {viewAllDepartment, viewDepartmentForm, addDepartment}=require('../controllers/department')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')
const {viewInstituteEmployeeInfo, viewAllInstituteEmployees, renderEmployeeSalaryCompletePage, generateSalary, markPaid}=require('../controllers/employee')
const {addEmployeeSalaryInfo, renderAddSalaryInfoForm, addAllowancesToEmployee, renderEmployeeSalaryInfo}=require('../controllers/Institute')
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});
const  upload = multer({ storage: storage })
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
/*
    @Route  POST  /admin/employee/id/salary
    @Desc   For admin to generate user salary
    @Access Private
*/
router.post('/employee/:id/salary',[isLoggedIn, isAdmin], generateSalary)
/*
    @Route  POST  /admin/employee/<%=employeeId%>/salary/<%=salary._id%>/pay
    @Desc   For admin to pay the salary
    @Access Private
*/
router.post('/employee/:employeeId/salary/:salaryId/pay',[isLoggedIn, isAdmin, upload.single('submissionFile')], markPaid)
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
    @Route  GET  /admin/employee/id/salary
    @Desc   To View employee salary info by employee
    @Access Private
*/
router.get('/employee/:id/salary', [isLoggedIn, isAdmin], renderEmployeeSalaryCompletePage)
/*
    @Route  GET  /admin/employee/<%=employeeId%>/salary/<%=salary._id%>/pay
    @Desc   For admin to pay the salary
    @Access Private
*/
router.get('/employee/:employeeId/salary/:salaryId/pay',[isLoggedIn, isAdmin], async (req, res)=>{
    res.render('./admin/viewPaymentForm', {employeeId: req.params.employeeId, salaryId: req.params.salaryId})
})
/*
    @Route  GET  /admin/employeeinfo
    @Desc   To View employee salary info by employee
    @Access Private
*/
router.get('/employeeinfo/:id', [isLoggedIn, isAdmin], renderEmployeeSalaryInfo)
module.exports=router