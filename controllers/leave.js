const {User,Admin} = require("../models/User");
exports.applyforleave = async (req, res) => {
   try{
        const foundUser=await User.find({employeeId: req.session.user.employeeID})
        // console.log(req.body);
        const {startDate, endDate, reason} = req.body
        
        const leave = {
            startDate : startDate,
            endDate : endDate,
            leaveReason : reason,
            approvedStatus : 'Waiting'
        }

        foundUser.appliedLeave.push(leave);
        foundUser.save(done);
        req.flash('success','Leave Application Successfully Submitted')
        res.redirect('/faculty/applyleave')
        
    }catch(err){
        req.flash('error', 'Something Went Wrong ${err.message}')
        res.redirect('/faculty/applyleave')
    }
}