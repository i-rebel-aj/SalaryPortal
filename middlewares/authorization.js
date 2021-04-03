const Superuser=require('../models/Superuser')
exports.isAdmin =(req, res, next)=>{
    if(res.locals.currentUser.Type==='Admin'){
        next()
    }else{
        req.flash('error', 'You are not authorized to view this page')
        res.redirect('/')
    }
}
exports.isFaculty = (req, res, next)=>{
    if(res.locals.currentUser.Type==='Faculty'){
        next()
    }else{
        req.flash('error', 'Only faculties can access this page')
        res.redirect('/')
    }
}
exports.isStaff = (req, res, next)=>{
    if(res.locals.currentUser.Type==='Staff'){
        next()
    }else{
        req.flash('error', 'Only Staff can access this page')
        res.redirect('/')
    }
}
exports.isManagement = (req, res, next)=>{
    if(res.locals.currentUser.Type==='Staff'){
        next()
    }else{
        req.flash('error', 'Only Management can access this page')
        res.redirect('/')
    }
}
exports.isSuperuser = async (req, res, next)=>{
    //Why I am doig this shit?
    try{
        const foundUser=await Superuser.findById(res.locals.currentUser._id)
        if(!foundUser){
            throw new Error('You are not authorized to view thi page')
        }else{
            next()
        }
    }catch(err){
        req.flash('error', 'Only Super Admin can access this page')
        res.redirect('/')
    }
}