import { Link } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { formatPrice } from '../scripts/utils.js'


export default function CourseCard({ courseProp }) {
	let { name, price, _id } = courseProp;

	return (
		<Container className="p-3 mb-3">
			<Card className="course-card text-center p-3 h-100">
				<Card.Body className="d-flex flex-column">
					<Card.Title className="course-card-title">{name}</Card.Title>
					<Card.Subtitle className="mt-2 text-muted">Price:</Card.Subtitle>
					<Card.Text className="course-card-price">{formatPrice(price)}</Card.Text>
					<Button className="mt-auto mx-auto" as={Link} to={`/courses/${_id}`} variant="primary">More Details</Button>
				</Card.Body>
			</Card>
		</Container>
	)
}