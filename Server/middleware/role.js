import userModel from '../models/user.js'
import jwt from 'jsonwebtoken'
import {jwt_key} from '../routes/user.js'
// import dotenv from 'dotenv'
// dotenv.config()

function roleware(arr){
    
    return async (req,res,next)=>{
    const token=req.get('token')
    const userData=jwt.decode(token)
    // const data= await userModel.find({phone:userData[0].phone})
    console.log(userData)
    if(arr.includes(userData.payload.role)){
        next()
    }else{
        return res.send(`${JSON.stringify({data:'',error:'Only Recruiter Can Post The Jobs'})}`)
    }
}
}


export default roleware