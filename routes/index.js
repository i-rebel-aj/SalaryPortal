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
    res.render("../views/admin/adminhome")
})

router.post("/adminhome", urlencodedparser, (req, res)=>{
	// console.log(req.body)
    res.render("../views/admin/adminhome")
})

router.get("/registerFaculty", (req, res)=>{
    res.render("../views/admin/registerFaculty")
})

router.post("/success", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("../views/admin/adminhome");
})

router.get("/leaves", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("../views/admin/viewleaves");
})

router.post("/leaves", urlencodedparser ,(req, res)=>{
    console.log(req.body);
    res.redirect("../views/admin/leaves");
})

router.get("/allfaculty", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("../views/admin/allfaculty");
})



// **** Faculty****

router.get('/facultyHome', function(req, res){
  res.render('../views/faculty/faculty_home');
});

router.post('/facultyHome', function(req, res){
  res.render('../views/faculty/faculty_home');
});

router.get('/salaryRecpt', function(req, res){
  res.render('../views/faculty/salary');
});

router.get('/applyleave', function(req, res){
  res.render('../views/faculty/applyleave');
});

router.get("/profile", urlencodedparser ,(req, res)=>{
    // console.log(req.body);
    res.render("../views/faculty/facProfile");
})
module.exports=router
