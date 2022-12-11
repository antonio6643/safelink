// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DataManager from "../../lib/DataManager"

/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */
export default function handler(req, res) {
	return new Promise(function(resolve, reject){
		if(req.method === 'POST'){
			let longLink = req.body.longLink
			let shortLink = req.body.shortLink
	
			DataManager.CreateShortenedLink(longLink, shortLink)
				.then((data) => {
					res.status(200).json({ success : true })
					resolve()
				})
				.catch((err) => {
					if(err === "Shortened link is already taken"){
						res.status(400).json({ success : false, message : err })
						resolve()
					} else {
						res.status(500).json({ success : false, message : err.message })
						resolve()
					}
				})
	
		} else {
			res.status(404).send("Not found")
			reject()
		}
	})
}
