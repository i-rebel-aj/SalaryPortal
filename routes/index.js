//Index Routes Goes Here
var bodyparser = require('body-parser');
const express = require("express");
const router = express.Router();
const fs = require('fs');

var urlencodedparser = bodyparser.urlencoded({extended: false});

router.get("/", (req, res)=>{
    res.render("login")
})

router.get("/adminhome", (req, res)=>{
	// console.log("get")
    res.render("adminhome")
})

router.post("/adminhome", urlencodedparser, (req, res)=>{
	// console.log(req.body)
    res.render("adminhome")
})

router.get("/registerFaculty", (req, res)=>{
    res.render("registerFaculty")
})

router.post("/success", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("home");
})

router.get("/leaves", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("viewleaves");
})

router.post("/leaves", urlencodedparser ,(req, res)=>{
    console.log(req.body);
    res.redirect("/leaves");
})

router.get("/allfaculty", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("allfaculty");
})

router.get("/profile", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("facProfile");
})
module.exports=router
