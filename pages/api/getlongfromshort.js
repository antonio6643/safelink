// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DataManager from "../../lib/DataManager"

/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */
export default function handler(req, res) {
	let short = req.query.short

	console.log(short)

	DataManager.GetLongLinkFromShort(short)
		.then(long => {
			if(long){
				res.status(200).send(long)
			} else {
				res.status(400).json({ success : false, message : "No long link" })
			}
		})
		.catch(err => {
			res.status(500).json({ success : false, message : err.message})
		})
}
