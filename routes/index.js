//Index Routes Goes Here
const express = require("express");
const router = express.Router();
/*==========================
    All GET Requests
===========================*/
// To Display Home Page
router.get("/", (req, res)=>{
    res.render('home')
})

module.exports=router
