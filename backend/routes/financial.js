const express = require("express")
const financialBookRouter = express.Router()
financialBookRouter.use(express.json())
const {financialModel} = require("../config/db")

financialBookRouter.get("/" ,async(req,res)=>{
    try{
        let Book = await financialModel.find()
        res.send(Book)
    }catch(err){
        res.send(err)
    }
})

module.exports = { financialBookRouter }
