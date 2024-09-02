import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Card, Col } from 'react-bootstrap';
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants/app';
import UserContext from '../UserContext';
import useSweetAlert from '../hooks/useSweetAlert';


export default function EditCourse() {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const { openAlert } = useSweetAlert();
	const { user } = useContext(UserContext);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);
	
	useEffect(() => {
		if (name !== "" && description !== "" && price > 0 ) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [name, description, price]);

	useEffect(()=> {
		fetch(`${API_BASE_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			setDescription(data.description);
			setPrice(data.price);
			// setSlots(data.slots);
		});
	}, [courseId]);

	function editCourse(e) {
	    e.preventDefault();

	    fetch(`${API_BASE_URL}/courses/${courseId}`, {
	    	method: "PUT",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
			    name: name,
			    description: description,
			    price: price,
			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	if (data) {
	    		openAlert({
	    		    title: "Course succesfully Updated",
	    		    text: `${name} is now updated`,
	    		});
	    		navigate("/admin");
	    	} else {
	    		openAlert('error', {
	    		    title: "Error!",
	    		    text: `Something went wrong. Please try again later!`,
	    		});
	    	}
	    })
	    setName('');
	    setDescription('');
	    setPrice(0);
	}

	return (
		<Container className="mt-5">
			<Col lg={{span:6, offset:3}}>
				<Card className="editcourse-card p-4">
				{ user.isAdmin ?
					<>
						<h3 className="my-3 text-center">Edit Course</h3>
						<Form onSubmit={e => editCourse(e)}>
							<Form.Group controlId="name" className="mb-3">
								<Form.Label>Course Name</Form.Label>
								<Form.Control 
									type="text" 
									placeholder="Enter Course Name" 
									value = {name}
									onChange={e => setName(e.target.value)}
									required
								/>
							</Form.Group>

							<Form.Group controlId="description" className="mb-3">
								<Form.Label>Course Description</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									placeholder="Enter Course Description" 
									value = {description}
									onChange={e => setDescription(e.target.value)}
									required
								/>
							</Form.Group>

							<Form.Group controlId="price" className="mb-3">
								<Form.Label>Course Price</Form.Label>
								<Form.Control 
									type="number" 
									placeholder="Enter Course Price" 
									value = {price}
									onChange={e => setPrice(e.target.value)}
									required
								/>
							</Form.Group>

							{/*<Form.Group controlId="slots" className="mb-3">
									<Form.Label>Course Slots</Form.Label>
									<Form.Control 
										type="number" 
										placeholder="Enter Course Slots" 
										value = {slots}
										onChange={e => setSlots(e.target.value)}
										required
									/>
							</Form.Group>*/}

							<Button variant="primary" type="submit" id="submitBtn" disabled={!isActive}>
								Update
							</Button>
							<Button className="m-2" as={Link} to="/admin" variant="secondary" type="submit" id="submitBtn">
								Cancel
							</Button>
						</Form>
					</>
					:
					<Navigate to="/courses" />
				}
				</Card>
			</Col>
		</Container>
	)
}