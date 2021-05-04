const mongoose=require("mongoose")
const managementSchema= new mongoose.Schema(
    {
        employeeID:{
            type: String,
            required: true
        },
        enrolledDate:{
            type: Date,
            required: true
        },
        designationId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        retiredStatus:{
            type: Boolean,
            default: false
        },
        //Improvise The DB Design on this one
        leaveInfo:[
            {
                year:{
                    type: String
                },
                leavesLeft:{
                    type: Number
                }
            }
        ],
        salaryInfo:[
            {
                to:{
                    type: Date
                },
                from:{
                    type:Date
                },
                basePay:{
                    type: Number
                },
                receivedAllowances:[
                    {
                        claimReceipt:[
                            {
                                url: {
                                    type: String
                                }
                            },
                        ],
                        institutePaymentRecepit:[
                            {
                                url: {
                                    type: String
                                }
                            },
                        ],
                        totalReceivedAmount:{
                            type: Number
                        },
                        allowanceId:{
                            type: mongoose.Schema.Types.ObjectId
                        },
                        remarks:{
                            type: String
                        }
                    }
                ],
                paymentReceipts:[
                    {
                        url:{
                            type: String
                        }
                    }
                ],
                leaveDeductions:{
                    type: Number,
                    default: 0
                },
                taxDeduction:{
                    type: Number
                },
                //totalAmountSettled=base+ allowances- leaveDeducations - taxDeductions
                totalAmountSettled:{
                    type: Number
                },
                isPaid:{
                    type: Boolean,
                    default: false
                },
                isGenerated:{
                    type: Boolean,
                    default: false
                }
            }
        ],
        appliedLeave:[
            {
                leaveFilePath: {
                    type: String,
                },
                startDate :{
                    type: Date,   
                },
                endDate : {
                    type: Date,
                },
                leaveReason : {
                    type: String,
                },
                approvedStatus: {
                    type: String,
                    enum: ['Approved', 'Rejected', 'Waiting']
                }
            }
        ]
    }
)
module.exports=managementSchema