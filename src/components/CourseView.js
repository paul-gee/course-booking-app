import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function CourseView(){

	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const { courseId } = useParams();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	const enroll = (courseId, name, price, firstName, lastName) => {

		console.log(courseId)
		console.log(name)
		console.log(firstName)
		console.log(lastName)
		console.log(price)

		fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
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
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

	}, [courseId, name, price])


	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
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
     })

	return (
		<Container className="mt-5">
		  <Row>
		     <Col lg={{span:6, offset:3}}>
				<Card>
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle className="mt-3">Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text>PHP {price}</Card.Text>
						<Card.Subtitle>General Class Schedule:</Card.Subtitle>
						<Card.Text>8:00AM to 5:00PM</Card.Text>
						{
							(user.id!==null)?
								(user.isAdmin === true) ?
								<Button 
									className="course-edit-button mt-1 px-3"
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
										className="enroll-button"
										variant="primary"
										onClick={()=>enroll(courseId, name, price, user.firstName, user.lastName)}
									>
										Enroll
									</Button>
									:
									<>
									<Button 
										className="enroll-button"
										variant="warning"
										disabled
									>
										Currently Enrolled
									</Button>
									</>
								}
								</>
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