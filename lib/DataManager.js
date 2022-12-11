// Handles all MongoDB stuff
import mongoose from "mongoose"

import Link from "../models/Link"

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
	useNewUrlParser : true,
	useUnifiedTopology : true
})

const DataManager = {}

DataManager.GetLongLinkFromShort = function(short){
	return new Promise(function(resolve, reject){
		Link.findOne({
			short : short
		}, (err, data) => {
			if(err){
				reject(err)
			}

			if(data){
				resolve(data.destinationURL)
			} else {
				resolve(null)
			}
		})
	})
}

DataManager.CreateShortenedLink = function(longlink, short){
	return new Promise(function(resolve, reject){
		DataManager.GetLongLinkFromShort(short)
			.then(long => {
				if(long){
					reject("Shortened link is already taken")
				} else {
					let newShort = new Link({
						destinationURL : longlink,
						short : short
					})

					newShort.save().catch(err => reject(err)).then(() => {
						resolve()
					})
				}
			})
			.catch(err => reject(err))
	})
}

export default DataManager