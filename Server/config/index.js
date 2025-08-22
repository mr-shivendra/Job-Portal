import mongoose from 'mongoose'
const url='mongodb://389488438/BusinessDatas'

const connection= mongoose.connect(url)

export default connection
