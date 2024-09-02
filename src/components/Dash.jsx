import { useContext, useState, useEffect } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext.js";
import { API_BASE_URL } from '../constants/app.js';
import { formatPrice } from '../scripts/utils.js';
import useSweetAlert from "../hooks/useSweetAlert.js";


export default function Dash() {
	const { user } = useContext(UserContext);
	const { openAlert } = useSweetAlert();
	const [allCourses, setAllCourses] = useState([]);
	
	useEffect(() => {
		fetchData();
	}, [])

	const fetchData = () => {
		fetch(`${API_BASE_URL}/courses/all`,{
			headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`}
		})
		.then(res => res.json())
		.then(data => {
			setAllCourses(data.map((course, index) => {
				return(
					<tr key={course._id}>
						<td>{index + 1}</td>
						<td className="hideOnSmall">{course._id}</td>
						<td>{course.name}</td>
						<td className="hideOnSmall">{course.description}</td>
						<td className="hideOnSmall">{formatPrice(course.price)}</td>
						<td>{course.isActive ? "Active" : "Inactive"}</td>
						<td>
							<ButtonGroup vertical>
								{ 
									(course.isActive) ?
									<Button variant="dark" size="sm" onClick={() => archive(course._id, course.name)}>Archive</Button>
									:
									<Button variant="success" size="sm" onClick={() => unarchive(course._id, course.name)}>Unarchive</Button>
								}
								<Button as={ Link } to={`/courses/${course._id}`} variant="primary" size="sm" className="mt-1">View</Button>
								<Button as={ Link } to={`/editCourse/${course._id}`} variant="secondary" size="sm" className="mt-1">Edit</Button>
							</ButtonGroup>
						</td>
					</tr>
				)
			}))
		})
	}

	const archive = (courseId, courseName) => {

		fetch(`${API_BASE_URL}/courses/${courseId}/archive`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: false
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data) {
				openAlert({
					title: "Archive Succesful!",
					text: `${courseName} is now inactive.`,
				})
				fetchData();
			} else {
				openAlert('error', {
					title: "Archive Unsuccessful!",
					text: `Something went wrong. Please try again later!`,
				})
			}
		})
	}

	const unarchive = (courseId, courseName) => {
		fetch(`${API_BASE_URL}/courses/${courseId}/active`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: true
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data) {
				openAlert({
					title: "Unarchive Succesful!",
					text: `${courseName} is now active.`,
				})
				fetchData();
			} else {
				openAlert('error', {
					title: "Unarchive Unsuccessful!",
					text: "Something went wrong. Please try again later!",
				})
			}
		})
	}

	return (
		(user.isAdmin)
		?
		<>
			<div className="my-5 text-center">
				<h3 className="page-header">Admin Dashboard</h3>
				<Button className="m-2" as={Link} to="/addCourse" variant="primary" size="md">Add Course</Button>
				<Button as={Link} to="/admin/enrollments" variant="secondary" size="md" className="m-2">Show Enrollments</Button>
			</div>
			<Table className="admin-course-table text-center align-middle" width="100%" striped hover>
		     <thead className="align-middle">
		       <tr>
		       	 <th width="5%">#</th>
		         <th className="hideOnSmall" width="13%">Course ID</th>
		         <th width="17%">Course Name</th>
		         <th className="hideOnSmall" width="35%">Description</th>
		         <th className="hideOnSmall" width="12%">Price</th>
		         <th width="8%">Status</th>
		         <th width="10%">Action</th>
		       </tr>
		     </thead>
		     <tbody>
		       { allCourses }
		     </tbody>
		   </Table>
		</>
		:
		<Navigate to="/courses" />
	)
}