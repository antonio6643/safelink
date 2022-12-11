import Head from 'next/head'
import Image from 'next/image'
import CreateForm from '../components/CreateForm'
import { FaShieldAlt } from "react-icons/fa"

export default function Home() {
	return (
		<main>
			<div className="flex flex-col items-center">
				<div className="my-6 text-blue-500 flex items-center">
					<FaShieldAlt className="text-5xl mr-2"/>
					<h1 className="drop-shadow-md">SafeLink</h1>
				</div>
				<div className="bg-white drop-shadow-md rounded-sm p-4 w-1/2">
					<CreateForm />
				</div>
			</div>
		</main>
	)
}
