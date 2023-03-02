import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function CourseView(){

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	const { courseId } = useParams();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	const enroll = (courseId) => {

		fetch('http://localhost:4000/users/enroll', {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				Authorization:`Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){

				Swal.fire({
				  title: "Enrollment Successful!",
				  icon: "success",
				  text: "Thank you for enrolling!"
				});
				navigate("/courses")

			} else {

				Swal.fire({
				  title: "Something went wrong!",
				  icon: "error",
				  text: "Check your credentials!"
				});

			}

		})
	}

	useEffect(() => {
		console.log(courseId);
		fetch(`http://localhost:4000/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

	},[courseId])

	return(
		<Container className="mt-5">
		  <Row>
		     <Col lg={{span:6, offset:3}}>
				<Card>
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text>PHP {price}</Card.Text>
						<Card.Text>Class Schedule</Card.Text>
						<Card.Text>8:00AM to 5:00PM</Card.Text>
						{
							(user.id!==null)?
							<Button variant="primary" onClick={()=>enroll(courseId)}>Enroll</Button>
							:
							<Link className="btn btn-danger" to="/login">Log in to Enroll</Link>
						}
						
					</Card.Body>
				</Card>
		     </Col>
		  </Row>
		</Container>
	)
}