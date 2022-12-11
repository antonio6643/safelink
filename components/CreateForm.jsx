import React, {useState} from 'react'
import axios from "axios"
import Link from 'next/link'

function noSpaceMask(text){
	return text.replace(/\s+/g, "")
}

function linkMask(text){
	return text.replace(/\s+/g, "").replace(/[^\w\-]+/g, "").substr(0, 30)
}

const CreateForm = () => {
	const [longLink, setLongLink] = useState("")
	const [shortLink, setShortLink] = useState("")
	const [canSubmit, setCanSubmit] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")
	const [newLink, setNewLink] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(`${longLink} => ${shortLink}`)

		axios.post('/api/createlink', {
			shortLink : shortLink,
			longLink : longLink
		})
		.then((response) => {
			setCanSubmit(false)
			setErrorMessage("")
			setNewLink(`${process.env.NEXT_PUBLIC_BASE_URL}${shortLink}`)
		})
		.catch((err) => {
			console.log(err)
			let response = err.response
			if(response.status == 400){ // Already exists
				setErrorMessage("That short link already exists")
			} else {
				console.log(response)
				setErrorMessage("An unknown error occured")
			}
		})

	}

	return (
		<form className="flex flex-col items-center" onSubmit={handleSubmit}>
			<label htmlFor="longlink" className="font-bold text-gray-700 text-4xl my-4">Paste your long URL</label>
			<div className="p-2 mt-1 w-[24rem] rounded-md border-2 border-gray-400 bg-white">
				<input required type="url" id="longlink" className="w-full bg-transparent" onChange={(e) => {
					let newText = noSpaceMask(e.target.value)
					e.target.value = newText
					setCanSubmit(true)
					setLongLink(newText)
				}} />
			</div>
			<label htmlFor="longlink" className="text-gray-400 font-normal">This is where you put the link that you want to redirect users to</label>

			<br />

			<label htmlFor="shortlink" className="font-bold text-gray-700 text-4xl my-4">Input your custom URL</label>
			<div className="p-2 mt-1 w-[24rem] rounded-md border-2 border-gray-400 bg-white">
				<span className="text-gray-500">{process.env.NEXT_PUBLIC_BASE_URL}</span>
				<input required minLength={4} maxLength={30} type="text" id="shortlink" onChange={(e) => {
					let newText = linkMask(e.target.value)
					e.target.value = newText
					setCanSubmit(true)
					setShortLink(newText)
				}} className="w-[13rem] bg-transparent" />
			</div>

			<br />

			<input type="submit" disabled={!canSubmit} className="p-2 bg-blue-400 hover:bg-blue-500 disabled:bg-gray-500 disabled:hover:bg-gray-500 cursor-pointer w-24 font-bold rounded-md text-white" />

			<p className="text-red-500">{errorMessage}</p>
			<p><Link href={newLink} target="_blank" rel="noreferrer">{newLink}</Link></p>
		</form>
	)
}

export default CreateForm