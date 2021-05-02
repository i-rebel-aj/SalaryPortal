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
// router.get("/", (req, res)=>{
//     res.render('faculty/applyleave.ejs')
// })

// router.post("/", (req, res)=>{
// 	// console.log(req.body)

//         console.log(startDate)
//         console.log(endDate)
//         console.log(reason)
//     res.render('faculty/applyleave.ejs')
// })

module.exports=router
