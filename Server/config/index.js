import mongoose from 'mongoose'
const url='mongodb://127.0.0.1:27017/BusinessDatas'

const connection= mongoose.connect(url)

export default connection