import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({bannerProp}){

	console.log(bannerProp);
	
	const {title, content, destination, label} = bannerProp;

	return (
		<div className="text-center my-5 py-3">
			<h2 className="page-header">{title}</h2>
			<h6 className="my-4">{content}</h6>
			<Button as={Link} to={destination} variant="primary">{label}</Button>
		</div>	
	)
}