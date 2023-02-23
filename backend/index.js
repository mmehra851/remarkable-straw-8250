
require("dotenv").config()
const express = require("express")
const app = express()
const {connection} = require("./config/db")
const {userRouter} = require("./routes/userRouter")
const {NovelRouter} = require("./routes/novel")
const {homeRouter} = require("./routes/homeRoute")
const {financialBookRouter} = require("./routes/financial")
const {userLogger} = require("./middleware/middle")


app.use(express.json())
app.use('/',userLogger)
app.use('/men',NovelRouter)
app.use('/women',financialBookRouter)
app.use('/home',homeRouter)
app.use('/user',userRouter)

app.get("/",(req,res)=>{res.send({msg:`Welcome to home route`})})

app.listen(process.env.PORT,async()=>{
    try{await connection
        console.log(`DB connected ...`)
    }catch(err){console.log(err)}
    console.log(`Server runing on port ${process.env.PORT}`)
})

