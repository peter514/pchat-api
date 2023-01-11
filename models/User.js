const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  userName: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  roles: 
    {
      type: String,
      default:"User"
    
    },
  active: {
    type: Boolean,
    default: true,
  },
  avatar:{
    type: String,
    default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
  },
  
  refreshToken: {
    type: String,
    required:  false,
    default: ""
  }
},

{
    timestamps:true
}

);

module.exports = mongoose.model('User', userSchema);
