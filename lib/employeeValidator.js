exports.getDesignationInfoById=(body, id)=>{
    try{
        let foundDesignation={}
        body.forEach((designation)=>{
            if(designation._id.toString()==id.toString()){
                foundDesignation=designation
            }
        })
        return foundDesignation
    }catch(err){
        console.log(err)
    }
}