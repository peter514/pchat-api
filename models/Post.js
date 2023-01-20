const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
 
  userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
 userName:{
    type:String,
    require:true
 },

 caption:{
    type:String,

 },

 images:[

 ],

 likes:[

 ],

 comments:[
    {
        comment:{
         type:String,

        },
        userName:{
            type:String,
        }
    }

 ],




  
 
},

{
    timestamps:true
}

);

module.exports = mongoose.model('Post', postSchema);
