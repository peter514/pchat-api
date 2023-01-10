const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");



const createUser = asyncHandler(async (req, res) => {

    const {userName, password } = req.body;

    //confirming required data
    if(!userName || !password) {
        return res.status(200).json({message: "All fields required!"});
    }

    //checking duplicates
    const dupUserName = await User.findOne({userName}).lean().exec();
    

    if(dupUserName) {
        return res.status(409).json({message: "A user with the same username already exists"});
    }
  

    //hash password
    
    const hashedPwd = await bcrypt.hash(password, 10);

    const userObject = {userName, "password": hashedPwd };

    //create and store tenant
    const user = await User.create(userObject);

    if(user) {
        res.status(201).json({message: `New user ${userName} created`});
        
            
    }else{
        res.status(400).json({message: "Invalid user data received"});
    }
    
});

// get all users ....................................
const getAllUsers = asyncHandler(async(req,res)=>{

    const users = await User.find().select("-password").lean().exec();
    if(!users || users.length === 0) return res.status(200).json({message: "No users found!"});

    res.status(200).json(users)


});

// get user by id 
const getUserById = asyncHandler(async (req,res)=>{
    const {userId} = req.params;
    if(!userId ) return res.status(400).json({message: "No user id receeived!"});

    const foundUser = await User.findById({_id : userId}).select("-password").exec();
    
    if(!foundUser) return res.status(200).json({message: "No user found!"});

    res.status(200).json(foundUser);


})


module.exports= {
createUser,
getAllUsers,
getUserById

}