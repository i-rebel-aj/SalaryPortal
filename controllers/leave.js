const {User,Admin} = require("../models/User");
exports.applyforleave = async (req, res) => {
   try{
        const foundUser=await User.findById(req.session.user._id)
        console.log(foundUser)
        const {startDate, endDate, reason} = req.body
        
        const leave = {
            startDate : startDate,
            endDate : endDate,
            leaveReason : reason,
            approvedStatus : 'Waiting'
        }
        console.log(leave);
        foundUser.appliedLeave.push(leave);
        await foundUser.save();
        req.flash('success','Leave Application Successfully Submitted')
        res.redirect('/faculty/applyleave')
        
    }catch(err){
        req.flash('success', 'Something Went Wrong ${err.message}')
        res.redirect('/faculty/applyleave')
    }
}