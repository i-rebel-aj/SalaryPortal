const mongoose=require("mongoose")
const employeeSchema= new mongoose.Schema(
    {
        employeeID:{
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
        designation:[
            {
                designationName: {
                    type: String
                }
            }
        ],
        retiredStatus:{
            type: Boolean,
            default: false
        }
    }
)
module.exports=employeeSchema