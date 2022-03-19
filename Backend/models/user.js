const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require("validator");



const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    username: {
        type: String,
      
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
        
    },
    password: {
        type: String,
       
    },
    profilePic:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    userdescription:{
        type:String,
        required:true
    },

    ratings:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('User', UserSchema)