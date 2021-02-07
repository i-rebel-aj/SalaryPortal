//Index Routes Goes Here
const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("login")
})

router.get("/home", (req, res)=>{
    res.render("home")
})

router.get("/registerFaculty", (req, res)=>{
    res.render("registerFaculty")
})
module.exports=router