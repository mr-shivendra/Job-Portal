import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import roleware from '../middleware/role.js'
import userCheckware from '../middleware/userChecker.js'
import UserModel from '../models/user.js'

const hasstime=9
const jwt_key='hash10'

const userRouter=express.Router()

userRouter.post('/Registration',async(req,res)=>{
    try {
        const {name,phone,password,rePassword,email,role}=req.body
        if (password!==rePassword){
            return res.send('Something missing in Re-password')
        }
        const hashpass= await bcrypt.hash(password,hasstime)
        const newUser=new UserModel({
            name,phone,password:hashpass,email,role
        })
        await newUser.save()
        return res.send('Congratulations')      
    } catch (error) {
        return res.send(`${error}`)
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
            //  console.log(userDetails)
        }
        // console.log(userDetails)
        if (userDetails.length===1){
             console.log(userDetails)
            const token=jwt.sign({payload:userDetails[0]},jwt_key)
        return res.send(`${token}`)
        }else{
            return res.send('payload is not here')
        }
        
    } catch (error) {
        return res.send(`${error}`)
    }
})


userRouter.get('/userDetail/:id',roleware(['recruiter','admin','user']),async(req,res)=>{
    try {
        const id=req.params.id
        const userDetails=await UserModel.find({_id:id})
        // const token=jwt.sign(userDetails,jwt_key)
         res.send(`${JSON.stringify(userDetails[0])}`)
    } catch (error) {
        res.send(`${error}`)
    }
})



export { userRouter,jwt_key}