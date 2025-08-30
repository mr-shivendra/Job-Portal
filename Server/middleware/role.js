import jwt from 'jsonwebtoken'

function roleware(arr){
    
    return async (req,res,next)=>{
    const token=req.get('token')
    const userData=jwt.decode(token)
    console.log(userData)
    if(arr.includes(userData.payload.role)){
        next()
    }else{
        return res.send(`${JSON.stringify({data:'',error:'Only Recruiter Can Post The Jobs'})}`)
    }
}
}


export default roleware