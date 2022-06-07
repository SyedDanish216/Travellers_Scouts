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

    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username:{
        type:String,
        required:true
    },

    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],

    avgRating: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model('Destination', DestinationSchema);