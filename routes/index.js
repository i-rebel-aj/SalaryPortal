//Index Routes Goes Here
var bodyparser = require('body-parser');
const express = require("express");
const router = express.Router();
const fs = require('fs');

var urlencodedparser = bodyparser.urlencoded({extended: false});

router.get("/", (req, res)=>{
    res.render("login")
})

router.get("/home", (req, res)=>{
    res.render("home")
})

router.get("/registerFaculty", (req, res)=>{
    res.render("registerFaculty")
})

router.post("/success", urlencodedparser ,(req, res)=>{
    console.log(req.body);
    res.render("home");
})
module.exports=router
