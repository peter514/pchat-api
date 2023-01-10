const asyncHandler = require("express-async-handler");
const Message = require('../models/Message')

// send message......................

const sendMessage = asyncHandler(async(req,res)=>{
//get required data
const {senderId, receiverId, message} = req.body;

//confirm data || validating
if (!senderId || !receiverId || !message)  return res.status(200).json({message: "Enter all fields!"});

//message object 
const messageObj = {senderId, receiverId, message};

//storing the message
const sentMessage = await Message.create(messageObj);

if(!sentMessage) return res.status(400).json({message: "Ooops, an error occured!"})

res.status(200).json({message:"Sent ✔"});

})

// get messages using loginuser ID

const getConversation = asyncHandler(async(req,res)=>{
    const {bothUserId} = req.params;
    if(!bothUserId) return res.status(400).json({message: "Id are required!"})

    //split the ids 
     const senderId = bothUserId.split(':')[0];
     const receiverId = bothUserId.split(':')[1];


    //validate 
    if (!senderId || !receiverId) return res.status(400).json({message: "Failed, an error occured!"});

    //fetch messages 
    const conversation = await Message.find({ $or:[{ $and: [{ senderId: senderId }, { receiverId: receiverId }],},{ $and: [{ senderId: receiverId }, { receiverId: senderId }],}] }).lean().exec();

    if(!conversation) return res.status(400).json({message: "Ooops, an error occured!"});

    if(conversation.length === 0) return res.status(200).json({message: "No messages!"})

    res.status(200).json(conversation)


})


module.exports = {
    sendMessage,
    getConversation
}