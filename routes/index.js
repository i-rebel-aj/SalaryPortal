//Index Routes Goes Here
const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("login")
})

router.get("/adminhome", (req, res)=>{
	// console.log("get")
    res.render("../views/admin/adminhome")
})

router.post("/adminhome", (req, res)=>{
	// console.log(req.body)
    res.render("../views/admin/adminhome")
})

router.get("/registerFaculty", (req, res)=>{
    res.render("../views/admin/registerFaculty")
})

router.post("/success", (req, res)=>{
    // console.log(req.body);
    res.render("../views/admin/adminhome");
})

router.get("/leaves", (req, res)=>{
    // console.log(req.body);
    res.render("../views/admin/viewleaves");
})

router.post("/leaves", (req, res)=>{
    console.log(req.body);
    res.redirect("../views/admin/leaves");
})

router.get("/allfaculty", (req, res)=>{
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

router.get("/profile", (req, res)=>{
    // console.log(req.body);
    res.render("../views/faculty/facProfile");
})
module.exports=router
