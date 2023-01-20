const mongoose = require("mongoose");

const messagUsSchema = new mongoose.Schema({
 
  fullName:{
    type:String,
  },
  phone:{
    type:Number,
  },
  message: {
      type: String,
    
    },
 
},

{
    timestamps:true
}

);

module.exports = mongoose.model('MessageUs', messagUsSchema);
