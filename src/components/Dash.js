import { useContext, useState, useEffect } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import '../css/Dash.css';

import Swal from "sweetalert2";

export default function Dash(){

	const {user} = useContext(UserContext);

	const [allCourses, setAllCourses] = useState([]);

	const fetchData = () =>{

		fetch('http://localhost:4000/courses/all',{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
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
						<td className="hideOnSmall">{course.price}</td>
						<td>{course.isActive ? "Active" : "Inactive"}</td>
						<td>
							<ButtonGroup vertical>
								{ 
									(course.isActive) ?
									<Button variant="danger" size="sm" onClick={() => archive(course._id, course.name)}>Archive</Button>
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

	const archive = (courseId, courseName) =>{
		console.log(courseId);
		console.log(courseName);

		fetch(`http://localhost:4000/courses/${courseId}/archive`,{
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
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Archive Succesful!",
					icon: "success",
					text: `${courseName} is now inactive.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Archive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}

	const unarchive = (courseId, courseName) =>{
		console.log(courseId);
		console.log(courseName);

		fetch(`http://localhost:4000/courses/${courseId}/active`,{
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
			console.log(data);

			if(data){
				Swal.fire({
					title: "Unarchive Succesful!",
					icon: "success",
					text: `${courseName} is now active.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Unarchive Unsuccessful!",
					icon: "error",
					text: "Something went wrong. Please try again later!"
				})
			}
		})
	}

	useEffect(() => {
		fetchData();
	})

	return(
		(user.isAdmin)
		?
		<>
			<div className="my-5 text-center">
				<h1>Admin Dashboard</h1>
				<Button as={Link} to="/addCourse" variant="primary" size="md" className="mx-2">Add Course</Button>
				<Button variant="success" size="md" className="mx-2" disabled>Show Enrollments</Button>
			</div>
			<Table striped bordered hover className="text-center align-middle">
		     <thead>
		       <tr>
		       	 <th> No</th>
		         <th className="hideOnSmall">Course ID</th>
		         <th>Course Name</th>
		         <th className="hideOnSmall">Description</th>
		         <th className="hideOnSmall">Price</th>
		         <th>Status</th>
		         <th>Action</th>
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