import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const postSchema = mongoose.Schema({    
    title : {type: String,required : true},
    body : {type: String,required : true},
    photo : {type : String , default : "No Photo"},    
    postedBy : {type : ObjectId ,ref : "User"},
    Likes: [{ type: ObjectId, ref: "User" }],
    Comments: [  
        {
            Text: String,
            PostedBy: {
                type: ObjectId,
                ref: "User",
            },
        },
    ],

},{timestamps: true});
 

module.exports = mongoose.model('Post',postSchema);