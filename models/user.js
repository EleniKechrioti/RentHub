

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  
  const userSchema = new Schema({
    username: String,
    password: String,
    favorites:{
        Object:[
            {
                id:Number,
                description:String,
                title:String,
                cost:Number,
                image:String
            }
        ]
    }
}); 
  
  
  const user = mongoose.model('contacts',userSchema);
  
  
  module.exports = user;
