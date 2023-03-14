import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({bannerProp}){

	console.log(bannerProp);
	
	const {title, content, destination, label} = bannerProp;

	return (
		<div className="text-center my-5">
			<Row>
				<Col>
					<h1>{title}</h1>
					<h5 className="my-4">{content}</h5>
					<Button className="banner-button" as={Link} to={destination} variant="primary">{label}</Button>
				</Col>
			</Row>
		</div>	
	)
}