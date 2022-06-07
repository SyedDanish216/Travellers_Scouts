const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    comment: String,
    rating: Number,
    author: {
        type: Object
    }
})

module.exports = mongoose.model("Comment", commentSchema)

