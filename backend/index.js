

const express = require("express")
const app = express()

const {userRouter} = require("./routes/userRouter")

require("dotenv").config()
const {connection} = require("./config/db")

app.use(express.json())
app.use('/user/login',userLogger)
app.use('/user',userRouter)




app.get("/",(req,res)=>{res.send({msg:`Welcome`})})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        
        console.log(`connected to MongoDB ...`)
    }catch(err){console.log(err)}
    console.log(`Server runing at port ${process.env.PORT}`)
})
