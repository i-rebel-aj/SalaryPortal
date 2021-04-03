const { Faculty, Staff, Management } = require("../models/User");
exports.addUser = async (req, res) => {
  console.log('Request comming here')
  const {type, email, pass, confirmpass, gender, instituteName, employeeId, department, enrolledDate, designation, retiredStaus, name}=req.body
if(pass!==confirmpass){
      req.flash('error', 'Passwords do not match')
      res.redirect('/user/auth/signup')
    //res.status(400).json({message: 'Passwords do not match'})
  }else{
      try{
        const newUser={
            email: email, 
            password: pass, 
            name: name,
            gender: gender,
            instituteName: instituteName,
            department: department,
            enrolledDate: enrolledDate,
            enrollmentNumber: enrollmentNumber,
            designation: designation
        }
        if(retiredStaus==='Yes'){
            newUser.retiredStaus=true
        }else if(retiredStaus==='No'){
            newUser.retiredStaus=false
        }
        if(type==='Faculty'){
            const faculty=new Faculty(newUser)
            await faculty.save()
        }else if(type==='Staff'){
            const staff=new Staff(newUser)
            await staff.save()
        }else if(type==='Management'){
            const management=new Management(newUser)
            await management.save()
        }else{
            throw new Error('Invalid Type Selected')
        } 
        req.flash("success", "Email already exists")
        res.redirect('/admin')
      }catch(err){
          //Handle Errors
          console.log(err)
          //Explain code 11000 here
            if (err.code === 11000) {
                if (err.keyValue.email) {
                    req.flash("error", "Email already exists")
                    res.redirect('back')
                }
            }
            req.flash('error', 'Something went wrong')
            res.redirect('back')
        } 
    }
}