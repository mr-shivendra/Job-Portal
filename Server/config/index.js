import mongoose from 'mongoose'
const url='' // write your database url here


const connection= mongoose.connect(url)

export default connection
