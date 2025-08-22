import mongoose from 'mongoose'

const appliedObject = new mongoose.Schema({
    jobId:{type:String},
    company: { type: String },
    status: String,
    message: String
})

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    education:{type:String,default:''},
    email:{type:String,required:true,unique:true,match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    skills:{type:[String],default:[]},
    appliedDetails:{type:[appliedObject],default:[]},//{jobId:'',company:'',status:'',message:''}
    role:{type:String,required:true,enum: ["user", "recruiter","admin"], default:'user'},
})

const UserModel=mongoose.model('JobUser',userSchema)

export default UserModel