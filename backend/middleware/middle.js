


const fs = require("fs")
const {userModle} = require("../config/db")




const userLogger=async(req,res,next)=>{


    const user = await userModle.findOne({email:req.body.email})
    let date = Date(Date.now()).toString("hex")
    fs.appendFileSync("./log.txt",`The ${user.Role} || Login ${user.username} || on ${date} \n`)
    next()
}




module.exports = { 
    userLogger 
}
