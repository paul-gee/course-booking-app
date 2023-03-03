import { useState, useEffect, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function AddCourse() {

	const {user} = useContext(UserContext);

	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
    // const [slots, setSlots] = useState(0);

    const [isActive, setIsActive] = useState(false);

	function addCourse(e) {

	    e.preventDefault();

	    fetch('http://localhost:4000/courses', {
	    	method: "POST",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
			    name: name,
			    description: description,
			    price: price,
			    // slots: slots
			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	console.log(data);

	    	if(data){
	    		Swal.fire({
	    		    title: "Course succesfully Added",
	    		    icon: "success",
	    		    text: `${name} is now added`
	    		});

	    		navigate("/admin");
	    	}
	    	else{
	    		Swal.fire({
	    		    title: "Error!",
	    		    icon: "error",
	    		    text: `Something went wrong. Please try again later!`
	    		});
	    	}

	    })

	    setName('');
	    setDescription('');
	    setPrice(0);
	    // setSlots(0);

	}

	useEffect(() => {

        if(name !== "" && description !== "" && price > 0){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, price]);

    return (

    	<Container className="mt-5">
		  <Row>
		     <Col lg={{span:6, offset:3}}>
				<Card className="p-3">
					{ user.isAdmin ?
					<>
				    	<h3 className="my-3 text-center">Add a Course</h3>
				        <Form onSubmit={(e) => addCourse(e)}>
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

			        	    { isActive 
			        	    	? 
			        	    	<Button variant="primary" type="submit" id="submitBtn">
			        	    		Save
			        	    	</Button>
			        	        : 
			        	        <Button variant="danger" type="submit" id="submitBtn" disabled>
			        	        	Save
			        	        </Button>
			        	    }
			        	    	<Button className="m-2" as={Link} to="/admin" variant="success" type="submit" id="submitBtn">
			        	    		Cancel
			        	    	</Button>
				        </Form>
			    	</>
		    		:
		    	    <Navigate to="/courses" />
		    		}
				</Card>
		     </Col>
		  </Row>
		</Container>
    )

}