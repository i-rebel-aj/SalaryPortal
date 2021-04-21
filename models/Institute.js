const mongoose=require("mongoose")
const InstituteSchema=new mongoose.Schema(
    {
        //Common Entries Goes Here
        instituteName:{
            type: String,
            unique: true,
            required: true
        },
        employeeInfo:[
            {
                employeeType:{
                    type: String,
                    enum: ['Faculty', 'Staff', 'Management']
                },
                designationName: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'SalaryPortal_Department'
                },
                stipendCurrency: {
                    type: String
                    //Add Enums
                },
                annualbasePay: {
                    type: Number
                },
                annualAllowances:[
                    {
                        allowanceName:{
                            type: String
                        },
                        allowanceAmount:{
                            type: Number
                        },
                        allowanceInfo:{
                            type: String
                        }
                    }
                ],
                paidLeavesPermitted:{
                    type: String
                },
                pensionInfo:{
                    minServiceYears:{
                        type: Number
                    },
                    minAge:{
                        type: Number
                    },
                    pensionPay:{
                        type: Number
                    }
                }
            }
        ],
        assignedAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SalaryPortal_User'
        },
        insituteDetails:{
            foundDate:{
                type: Date
            },
            directorEmail:{
                type: String
            },
            about:{
                type: String
            },
            websiteLink:{
                type: String
            }
        }
        
    },{timestamps: true}
)
const Institute=mongoose.model('SalaryPortal_Institute', InstituteSchema)
module.exports= Institute
