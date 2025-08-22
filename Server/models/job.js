import mongoose from 'mongoose'

const jobListed=mongoose.Schema({
    title:{type:String,required:true},
    description:{type: String,required:true},
    company:{type:String,required:true},
    appliedId:{type:[String],default:[]},
    rejectedId:{type:[String],default:[]},
    hiredId:{type:[String],default:[]},
    lastDate:{type:String,required:true},
    recruiterId:{type:String,required:true}
})

const JobModel=mongoose.model('JobListed',jobListed)

export default JobModel