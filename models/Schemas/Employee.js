const mongoose=require("mongoose")
const employeeSchema= new mongoose.Schema(
    {
        employeeID:{
            type: String,
            required: true
        },
        department:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SalaryPortal_Department',
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