const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DestinationSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },


    description:{
     type:String,
     required:true
    },    
    userthumbnail:{
        type:String,
        required:true
    },

    images: [String],
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    author:{
        type:Object,
        
    },
    username:{
        type:String,
        required:true
    },
    reviewcount:{
     type:Number,
     default:0
    },

    avgRating: Number

}, { timestamps: true })

module.exports = mongoose.model('Destination', DestinationSchema);