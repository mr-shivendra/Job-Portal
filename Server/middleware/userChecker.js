import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'

async function userCheckware(req,res,next){
    try {
       const {phone,password,email}=req.body
       let userData=[]
       if (phone){
           userData =await UserModel.find({phone:phone})
        console.log(userData)
       }else if(email && !phone){
          userData =await UserModel.find({email:email})
         console.log(email)
       }
       if (userData.length===1){
        bcrypt.compare(password, userData[0].password,async(err,result)=>{
             if (result){
                next()
             }else{
                res.send('Your Password is Incorrect Please Re-check')
             }
        }) 
       }else{
        res.send(`We are unable to find your account through ${phone || email} please Registar YourSelf`)
       }
       
    } catch (error) {
        console.log({error:`${error}`}) 
        res.send({error:`${error}`})
    }
    
} 

export default userCheckware