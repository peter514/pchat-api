const asyncHandler = require("express-async-handler");
const Post = require('../models/Post.js')
const multer = require('multer');
const path = require('path'); 

// add post 
const addPost = asyncHandler(  async (req,res)=>{
    

    
        // capturing post data
        const {userName, userId, caption, comments, likes}= req.body;

        //checking required data 
        if(!userName || !userId ) return res.status(400).json({message: "Oops, Failed!"});

        const imagesarray = ['https://images.pexels.com/photos/6143164/pexels-photo-6143164.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/12851969/pexels-photo-12851969.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/14155207/pexels-photo-14155207.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/14155708/pexels-photo-14155708.jpeg?auto=compress&cs=tinysrgb&w=600']

        //post object 
        const postObj = {
            userName, userId, caption, comments, likes, "images": imagesarray 
        }

        //create 
        const post = await Post.create({postObj});

                if (post) {
                res.status(201).json({ message: `Post created! ` });
            } else {
                res.status(400).json({ message: "An error occured try again" });
            }


       

          
 



})

//get all posts

const getPosts = asyncHandler( async (req,res)=>{
     const posts = await Post.find().lean().exec();
    if(!posts || posts.length === 0) return res.status(200).json({message: "No Posts found!"});

    res.status(200).json(posts)


})



//exports 
module.exports = {
    addPost,
    getPosts

}