const mongoose=require("mongoose")
const facultySchema= new mongoose.Schema(
    {
        enrollmentNumber:{
            type: String,
            required: true
        },
        department:{
            type: String,
            required: true
        },
        enrolledDate:{
            type: Date,
            required: true
        },
        designation:{
            type: String
        },
        retiredStatus:{
            type: Boolean,
            default: false
        }
    }
)
module.exports=facultySchema