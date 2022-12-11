import { useRouter } from "next/router"
import axios from "axios"

export default function Short({longLink}) {
	const router = useRouter()
	const short = router.query.short

	return (
		<main>
			<div className="flex flex-col items-center">
				<h1 className="mb-4">MyLink Route</h1>
				<h2 className="mb-2">This link redirects you to:</h2>
				<a href={longLink} className="text-3xl font-medium text-blue-500 mb-4">{longLink}</a>
				<a className="bg-blue-500 p-2 text-white font-bold rounded-lg" href={longLink}>Open Link</a>
			</div>
		</main>
	)
}

// Called on every request
export async function getServerSideProps(context){
	const {short} = context.params
	const res = await axios.get(`http://localhost:3000/api/getlongfromshort`, {
		params : {
			short : short
		}
	})

	const longLink = res.data

	return {
		props: {
			longLink : longLink
		}
	}
}