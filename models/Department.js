const mongoose=require("mongoose")
const DepartmentSchema=new mongoose.Schema(
    {
        //Common Entries Goes Here
        departmentName:{
            type: String,
            unique: true,
            required: true
        },
        containsEmployee:[
            {
                type: String,
                required: true
            },
        ],
        associatedInstituteId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SalaryPortal_Institute',
            required: true
        }
    },{timestamps: true}
)
const Department=mongoose.model('SalaryPortal_Department', DepartmentSchema)
//Add Validators later
module.exports= {Department}
