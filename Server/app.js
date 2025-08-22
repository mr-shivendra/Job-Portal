import express from 'express'
import cors from 'cors'
import connection from './config/index.js'
import {userRouter} from './routes/user.js'
import jobRouter from './routes/job.js'
// import multer from 'multer'

const port=2019

const app=express()

app.use(cors())
app.use(express.json())
app.use('/app',userRouter)
app.use('/job',jobRouter)

app.get('/',async(req,res)=>{
    res.send('server is running well')
})

app.listen(port,async(res,req)=>{
    await connection
    console.log(`server is running at http://localhost:${port}`)
})