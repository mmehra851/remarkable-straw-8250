const express = require("express")


const homeRouter = express.Router()
homeRouter.use(express.json())



const {HomeModel} = require("../config/db")


homeRouter.get("/" ,async(req,res)=>{
    try{
        let Book = await HomeModel.find()
        res.send(Book)
    }catch(err){
        res.send(err)
    }
})

module.exports = { homeRouter }
