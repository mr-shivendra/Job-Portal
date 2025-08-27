import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'

async function userCheckware(req,res,next){
    try {
       const {phone,password,email}=req.body
       let userData=[]
       if (phone){
           userData =await UserModel.find({phone:phone})
       }else if(email && !phone){
          userData =await UserModel.find({email:email})
       }
       if (userData.length===1){
        bcrypt.compare(password, userData[0].password,async(err,result)=>{
             if (result){
                next()
             }else{
                res.send(`${JSON.stringify({token:'',error:'Your Password is Incorrect Please Re-check',role:''})}`)
             }
        }) 
       }else{
        res.send(`${JSON.stringify({token:'',error:`We are unable to find your account through ${phone || email} please Registar YourSelf`,role:''})}`)
       }
       
    } catch (error) {
        res.send(`${JSON.stringify({token:'',error:error,role:''})}`)
    }
    
} 

export default userCheckware