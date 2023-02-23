const express = require("express")
const NovelRouter = express.Router()
NovelRouter.use(express.json())
const {NovelModel} = require("../config/db")

NovelRouter.get("/" ,async(req,res)=>{
    try{
        let Novel = await NovelModel.find()
        res.send(Novel)
    }catch(err){
        res.send(err)
    }
})


module.exports = { NovelRouter }