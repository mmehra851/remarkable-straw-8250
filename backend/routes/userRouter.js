//<--- All Imports here  ---->
const express = require("express")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")


const bcrypt = require("bcrypt")
const {userModle} = require("../config/db")
userRouter.use(express.json())
userRouter.post('/signUp',async(req,res)=>{
     try{
        const use = await userModle.findOne({email:req.body.email})
        if(use==null) res.status(404).send({msg:`email alredy exist..`})
        const hashedPassword = await bcrypt.hash(req.body.password,5)
        req.body.password=hashedPassword
        const user = new userModle(req.body)
        await user.save()
        res.send({msg:`New User Added ...`})
    }catch(err){ 
        res.send({msg:err.messege})
    }
})



userRouter.post('/login',async(req,res)=>{
    try{
        const user = await userModle.findOne({email:req.body.email})
        if(user==null) res.status(404).send({msg:`user not found`})
        if(await bcrypt.compare(req.body.password,user.password)){
            let token = jwt.sign({name:user.name,userid:user._id},process.env.secretKey,{expiresIn:"1h"})
            res.send({name:user.name,token:token})
        }else{
            res.send({msg:`Wrong credentials ...`})
        }
   }catch(err){
        res.send({msg:err.messege})
   }
})



module.exports = { userRouter }
