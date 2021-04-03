const express=require("express")
const router=express.Router();
const {userLogin, logout}=require('../controllers/auth')
const {isAdmin,isFaculty}=require('../middlewares/authorization')
const {isLoggedIn}=require('../middlewares/authentication')

/*===============================
    All GET routes goes here
=================================*/

router.get('/', (req, res)=>{
    res.render('./admin/adminhome')
})
router.get('/addemployee',(req, res)=>{
    res.render('./admin/registerFaculty')
} )

module.exports=router