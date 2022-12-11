import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema({
	destinationURL : { type : String, required : true },
	short : { type : String, unique : true },

	dateCreated : { type : Date, default : Date.now },
})

export default mongoose.models.Link ? mongoose.model('Link') : mongoose.model('Link', LinkSchema)