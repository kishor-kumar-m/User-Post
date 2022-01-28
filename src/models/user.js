import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String,required : true},
    last_name: {type: String},
    gender :{type: String,enum: ["male", "female"]},
    email: {type: String, required : true,unique: true, match :/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    mobile : {type : Number,required : true,unique :true,maxLength: 10,match : /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/},
    password:{type: String, required: true},
    Photo: {
		type: Buffer,
	},
	PhotoType: {
		type: String,
	},
	Followers: [{ type: ObjectId, ref: "User" }],
	Following: [{ type: ObjectId, ref: "User" }],

},{timestamps: true});


module.exports = mongoose.model('User',userSchema);