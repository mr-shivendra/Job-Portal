import express from 'express'
import JobModel from '../models/job.js'
import UserModel from '../models/user.js'
import jwt from 'jsonwebtoken'
import roleware from '../middleware/role.js'


const jobRouter=express.Router()


jobRouter.get('/',async(req,res)=>{
    try {
        const jobs=await JobModel.find()
        res.send(`${JSON.stringify({data:jobs})}`)
    } catch (error) {
        return res.send(`${error}`)
    }
})

jobRouter.get('/Jobid/:id',async(req,res)=>{
    try {
        const idx=req.params.id
        const jobs= await JobModel.find({_id:idx})
        if (jobs.length==0){
            return res.send(`${JSON.stringify({data:'',error:'This Job is not listed'})}`)
        }
        return res.send(`${JSON.stringify({data:jobs[0],error:''})}`)
    } catch (error) {
        return res.send(`${JSON.stringify({data:'',error:`${error}`})}`)
    }
})

jobRouter.get('/role/:title',async(req,res)=>{
    try {
        const title=req.params.title
        const jobs=await JobModel.find({title:title})
         jobs?res.send(`${JSON.stringify({data:jobs})}`):{data:''}
    } catch (error) {
        return res.send(`${error}`)
    }
})

jobRouter.get('/recruiter/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const jobs=await JobModel.find({recruiterId:id})
        jobs?res.send(`${JSON.stringify({data:jobs})}`):{data:''}
    } catch (error) {
        return res.send(`${error}`)
    }
})

jobRouter.post('/add',roleware(['recruiter']),async(req,res)=>{
    try {
        const token=req.get('token')
        const {title,description,lastDate,company}=req.body
         const userPhone=jwt.decode(token,jwt_key)
        const job=new JobModel({
            title,description,lastDate,company,
            recruiterId:userPhone.payload._id
        })
        await job.save()
        return res.send(`${JSON.stringify({data:`New Job has uploaded, role as ${title}`,error:''})}`)
    } catch (error) {
        return res.send(`${JSON.stringify({data:'',error:`${error}`})}`)
    }
})

jobRouter.put('/applied/:id',roleware(['admin','recruiter','user']),async(req,res)=>{
    try {
        const idx =req.params.id
        const token=req.get('token')
        const userDetails=jwt.decode(token)
        const jobDetail=await JobModel.find({_id:idx})
        const applyDetails={jobId:idx,status:'Applied',message:'',company:jobDetail[0].company}
        jobDetail[0].appliedId.push(userDetails.payload._id)
        await JobModel.findByIdAndUpdate({_id:idx},{appliedId:jobDetail[0].appliedId})
        await UserModel.findByIdAndUpdate(userDetails.payload._id,{ $push: { appliedDetails: applyDetails } } )
        res.send(`Job Successfully Applied`)
    } catch (error) {
        return res.send(`${error}`)
    }
})

jobRouter.put('/accept/:id',roleware(['recruiter']),async(req,res)=>{
    try {
        const jobId = req.params.id;
        const {id}=req.body
        const newData = {
      status: 'Accept',
      message: 'Your interview is scheduled tomorrow at 5pm IST'
    };

    // Fetch user
    const user = await UserModel.find({_id:id});
    if (!user) return res.status(404).send('User not found');
    user[0].appliedDetails = user[0].appliedDetails
  .filter(detail => typeof detail === 'object' && detail !== null && detail.jobId) // remove invalid entries
  .map(detail =>
    detail.jobId === jobId ? { ...detail.toObject(), ...newData } : detail
  );
  await user[0].save()

    // Fetch job
    const job = await JobModel.find({_id:jobId});
    if (!job) return res.status(404).send('Job not found');
    console.log(job[0])

    // Update hiredId and appliedId arrays
    if (!job[0].hiredId.includes(id)) job[0].hiredId.push(id);
    job[0].appliedId = job[0].appliedId.filter(id => id !== id);
    await job[0].save();

    res.send(`New member with ID ${id} Is Sended to Interview`);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
})

jobRouter.put('/reject/:id',roleware(['recruiter']),async(req,res)=>{
    try {
        const jobId =req.params.id
         const {id}=req.body

         
         const newData={
            status:'Rejected',
            message:'Skills Missing'
        }
        // Fetch user
    const user = await UserModel.find({_id:id});
    if (!user) return res.status(404).send('User not found');
    // Update appliedDetails array
    user[0].appliedDetails = user[0].appliedDetails// remove invalid entries
  .map(detail =>
    detail.jobId === jobId ? { ...detail.toObject(), ...newData } : detail
  );
  await user[0].save()

    // Fetch job
    const job = await JobModel.find({_id:jobId});
    if (!job) return res.status(404).send('Job not found');
    console.log(job[0])

    // Update hiredId and appliedId arrays
    if (!job[0].rejectedId.includes(id)) job[0].rejectedId.push(id);
    job[0].appliedId = job[0].appliedId.filter(id => id !== id);
    await job[0].save();
    res.send(`Member with ${id} is rejected`)
    } catch (error) {
        return res.send(`${error}`)
    }
})

jobRouter.delete('/delete/:id', roleware(['admin','recruiter']),async(req,res)=>{
    try {
        const idx=req.params.id
        const data=await JobModel.find({_id:idx})
        await JobModel.findByIdAndDelete({_id:idx})
        return res.send(`${data[0].title} has deleted from Job portal`)
    } catch (error) {
        return res.send(`${error}`)
    }
})

export default jobRouter
