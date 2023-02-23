
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
require("dotenv").config()

const connection = mongoose.connect(process.env.mongoURL)

const userSchema = mongoose.Schema({
   "name": { type: String, required: true },
   "email": { type: String, required: true },
   "mobile": { type: Number, required: true },
   "location": { type: String, required: true },
   "password": { type: String, required: true }
})

const BookSchema = mongoose.Schema({
   "id": { type: String},
   "Img": { type: String, required: true },
   "Inventry": { type: Number},
   "BookName": { type: String, required: true },
   "Price-Strick": { type: Number },
   "Price": { type: Number, required: true },
   "Rating": { type: Number, required: true }
})

const userModel = mongoose.model('user', userSchema)
const HomeModel = mongoose.model('home', BookSchema)
const financialModel = mongoose.model('financial', BookSchema)
const NovelModel = mongoose.model('Novel', BookSchema)

module.exports = { connection, userModel, HomeModel, financialModel, NovelModel }

