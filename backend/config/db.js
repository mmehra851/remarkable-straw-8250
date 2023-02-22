require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)


const connection = mongoose.connect(process.env.mongoURL)

const userSchema = mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "password": { type: String, required: true },
    "location": { type: String, required: true },
    "mobile": { type: Number, required: true }

},
{
    versionKey: false
})



const userModle = mongoose.model('user', userSchema)



module.exports = { connection, userModle }
