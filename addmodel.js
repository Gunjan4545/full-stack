const mongoose = require("mongoose");

const addSchema = mongoose.Schema({
      
    type:{
      type: String,
      required: true,
      enum: ["Jewellery", "Rukhawat", "Platters"],
    },
    price:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
   
});

module.exports = mongoose.model('Add',addSchema); 