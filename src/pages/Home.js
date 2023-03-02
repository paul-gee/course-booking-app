import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

export default function Home(){

	const data = {
		title: "Online Coding Bootcamp",
		content: "Opportunities for everyone, everywhere!",
		destination: "/courses",
		label: "Enroll now!"
	}

	return(
		<>
			<Banner bannerProp={data}/>
			<Highlights/>
		</>
	)
}