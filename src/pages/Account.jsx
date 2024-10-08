
import { useEffect, useState, useContext } from 'react';
import { Container, Row, Card, Table, InputGroup, Form } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext.js';
import { API_BASE_URL } from '../constants/app.js';
import { formatPrice, formatDate } from '../scripts/utils.js';


export default function Courses() {
	const { user } = useContext(UserContext);
	const [enrollmentData, setEnrollmentData] =useState([])

	useEffect(() => {
		fetch(`${API_BASE_URL}/users/details`, {
        	headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
			const enrollmentArr = (data.enrollments.reverse().map((enrollments, index) => {

				return (
					<tr key={enrollments._id}>
						<td>{index + 1}</td>
						<td className="hideOnSmall">{enrollments.courseId}</td>
						<td>{enrollments.name}</td>
						<td className="hideOnSmall">{formatPrice(enrollments.price)}</td>
						<td className="hideOnSmall">{formatDate(enrollments.enrolledOn)}</td>
						<td>{enrollments.status}</td>
					</tr>
				)
			}))
			setEnrollmentData(enrollmentArr);
		})
	}, [])

	return (
		user.isAdmin !== null ?
		<>
			<Row className="mt-5">
				<Container className="d-flex">
				<Card className="user-profile-card mx-auto">
					<Card.Header>
						Profile
					</Card.Header>
					<Card.Body>
						<InputGroup className="my-2 px-4">
							<InputGroup.Text className="user-profile-label">Name</InputGroup.Text>
							<Form.Control
								type="text"
								readOnly
								value={user.firstName + " " + user.lastName}
							/>
						</InputGroup>
						<InputGroup className="my-2 px-4">
							<InputGroup.Text className="user-profile-label">Email</InputGroup.Text>
							<Form.Control
								type="text"
								readOnly
								value={user.email}
							/>
						</InputGroup>
						<InputGroup className="my-2 px-4">
							<InputGroup.Text className="user-profile-label">Mobile</InputGroup.Text>
							<Form.Control
								type="text"
								readOnly
								value={user.mobileNo}
							/>
						</InputGroup>
					</Card.Body>
				</Card>
				</Container>
			</Row>
	
			<Row className="mt-5">
				<Card className="user-enrollments-card">
					<Card.Header>
						Enrollments
					</Card.Header>
					<Card.Body>
						<Table className="user-enrollments-table text-center align-middle" striped hover>
							<thead>
								<tr>
									<th>#</th>
									<th className="hideOnSmall">Course ID</th>
									<th>Course Name</th>
									<th className="hideOnSmall">Price</th>
									<th className="hideOnSmall">Enrolled On</th>
									<th>Status</th>
								</tr>
								</thead>
							<tbody>
								{ enrollmentData }
							</tbody>
						</Table> 
					</Card.Body>
				</Card>
			</Row>
		</>
		:
		<Navigate to="/courses"/>
	)
}