import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const url= process.env.URL //write your database url


const connection= mongoose.connect(url)

export default connection
