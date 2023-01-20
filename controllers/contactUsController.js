const asyncHandler = require("express-async-handler");
const MessageUs = require('../models/MessageUs')

const sendUsMessage = asyncHandler(async(req,res)=>{
//get required data
const {fullName, phone, message} = req.body;

if(!message) return res.status(200).json({message:"No message"});


//message object 
const messageObj = {fullName, phone , message};


//storing the message
const sentMessage = await MessageUs.create(messageObj);

if(!sentMessage) return res.status(400).json({message: "Ooops, an error occured!"})

res.status(200).json({message:"Sent ✔ I will get back to you soon."});

})

module.exports ={
    sendUsMessage
}