import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext.js';
import { API_BASE_URL } from '../constants/app.js';
import { formatPrice } from '../scripts/utils.js'


export default function CourseView() {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const { user, setUser } = useContext(UserContext);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	
	useEffect(() => {
		fetch(`${API_BASE_URL}/users/details`, {
		  headers: { Authorization:`Bearer ${localStorage.getItem('token')}` }
		})
		.then(res => res.json())
		.then(data => {
		  setUser({
			id: data._id,
			isAdmin: data.isAdmin,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			mobileNo: data.mobileNo,
			enrollments: data.enrollments
		  });
		})
	 }, [])
	
	 useEffect(() => {
		 fetch(`${API_BASE_URL}/courses/${courseId}`)
		 .then(res => res.json())
		 .then(data => {
			 setName(data.name);
			 setDescription(data.description);
			 setPrice(data.price);
		 })
 
	 }, [courseId, name, price])

	const enroll = (courseId, name, price, firstName, lastName) => {
		fetch(`${API_BASE_URL}/users/enroll`, {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				Authorization:`Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				courseId: courseId,
				name: name,
				price: price,
				firstName: firstName,
				lastName: lastName
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data === true) {
				Swal.fire({
				  title: "Enrollment Successful!",
				  icon: "success",
				  text: "Thank you for enrolling!",
				  confirmButtonColor: "#23857a"
				});
				navigate("/courses")
			} else {
				Swal.fire({
				  title: "Something went wrong!",
				  icon: "error",
				  text: "Check your credentials!",
				  confirmButtonColor: "#23857a"
				});
			}
		})
	}

	return (
		<Container className="mt-5 py-5">
			<Col lg={{span:6, offset:3}}>
				<Card className="view-course-card p-3">
					<Card.Body className="d-flex flex-column">
						<Card.Title className="course-card-title">
							{name}
						</Card.Title>
						<Card.Subtitle className="mt-3">Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text>{formatPrice(price)}</Card.Text>
						<Card.Subtitle>Class Schedules (Mon-Fri):</Card.Subtitle>
						<Card.Text>
							A: 2 Months - 8:00AM to 5:00PM <br/>
							B: 3 Months - 5:30PM to 9:30PM
						</Card.Text>
						{
							(user.id == null) ?
							<Link className="btn btn-login mx-auto mt-3" to="/login">Log in to enroll</Link>
							:
							(user.isAdmin === true) ?
								<Button 
									className="mt-1 px-3 mx-auto"
									as={ Link } to={`/editCourse/${courseId}`}
									variant="primary"
									size="sm"
								>
									Edit Course
								</Button>
								:
								<>
								{
									(user.enrollments.findIndex(i => i.courseId === courseId) === -1) ?
									<Button 
										className="mx-auto mt-3"
										variant="primary"
										onClick={()=>enroll(courseId, name, price, user.firstName, user.lastName)}
									>
										Enroll
									</Button>
									:
									<>
									<Button 
										className="mx-auto mt-3"
										variant="primary"
										disabled
									>
										Enrolled
									</Button>
									</>
								}
								</>
						}
					</Card.Body>
				</Card>
			</Col>
		</Container>
	)
}