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