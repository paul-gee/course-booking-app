
import { useEffect, useState, useContext } from 'react';
import { Row } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import UserContext from '../UserContext';

export default function Courses() {

	const [courses, setCourses] =useState([])

	const { user } = useContext(UserContext);

	console.log(user);

	useEffect(() => {
	fetch('http://localhost:4000/courses')
	.then(res => res.json())
	.then(data => {

	const courseArr = (data.map(course => {

		return (
			<CourseCard courseProp={course} key={course._id}/>
			)
		}))
		setCourses(courseArr)
	})

	}, [courses])

	return(
		(user.isAdmin)?
		<Navigate to="/admin"/>
		:
		<>
			<h1 className="text-center my-5">Available Courses</h1>
			<Row sm={1} md={2}>
					{courses}
			</Row>
		</>
	)
}