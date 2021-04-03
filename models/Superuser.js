const mongoose=require("mongoose")
const bcrypt = require("bcrypt");
const superUserSchema=new mongoose.Schema(
    {
        //Common Entries Goes Here
        email:{
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        }
    },{timestamps: true}
)
superUserSchema.pre('save', function(next) {
    let user = this;
    console.log('The User is')
    console.log(user)
    //Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    //generate a salt
    bcrypt.genSalt(10, (err, salt)=> {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash)=> {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
superUserSchema.methods = {
    authenticate: function  (plainpassword) {
      const isValidPass = bcrypt.compareSync(plainpassword, this.password);
      console.log(plainpassword)
      console.log(isValidPass)
      if(isValidPass){
        return true;
      }else{
        return false;
      }
    }
}
const superUser=mongoose.model('SalaryPortal_SuperUser', superUserSchema)
module.exports=superUser