import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import roleware from '../middleware/role.js'
import userCheckware from '../middleware/userChecker.js'
import UserModel from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

const userRouter=express.Router()

userRouter.post('/Registration',async(req,res)=>{
    try {
        const {name,phone,password,rePassword,email,role}=req.body
        if (password!==rePassword){
            return res.send(`${JSON.stringify({data:'',error:'Something missing in Re-password'})}`)
        }
        const hashpass= await bcrypt.hash(password,process.env.HASH_TIME)
        const newUser=new UserModel({
            name,phone,password:hashpass,email,role
        })
        await newUser.save()
        return res.send(`${JSON.stringify({data:`Congratulations You are new member as ${role}`,error:''})}`)      
    } catch (error) {
        return res.send(`${JSON.stringify({data:'',error:error})}`)
    }
})

userRouter.post('/login',userCheckware,async(req,res)=>{
    try {
        const {phone,email}=req.body
        let userDetails=[]
        if (phone){
             userDetails= await UserModel.find({phone:phone})
        }else if(email){
             userDetails= await UserModel.find({email:email})
        }
        if (userDetails.length===1){
            const token=jwt.sign({payload:userDetails[0]},process.env.JWT_KEY)
            return res.send(`${JSON.stringify({token:token,error:'',role:userDetails[0].role})}`)
        }else{
            return res.send(`${JSON.stringify({token:'',error:'Payload is not define',role:''})}`)
        }
        
    } catch (error) {
        return res.send(`${JSON.stringify({token:'',error:error,role:''})}`)
    }
})


userRouter.get('/userDetail/:id',roleware(['recruiter','admin','user']),async(req,res)=>{
    try {
        const id=req.params.id
        const userDetails=await UserModel.find({_id:id})
         res.send(`${JSON.stringify(userDetails[0])}`)
    } catch (error) {
        res.send(`${error}`)
    }
})

userRouter.put('/userDetailEdit/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const editData=req.body
        const userDetails=await UserModel.findByIdAndUpdate({_id:id},editData)
        return  res.send(`${JSON.stringify({data:userDetails[0],error:''})}`)
    } catch (error) {
        return res.send(`${JSON.stringify({data:'',error:'Server Low'})}`)
    }
})



export default userRouter