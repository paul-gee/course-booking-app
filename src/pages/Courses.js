
import { useEffect, useState } from 'react';
import { Container, Row } from "react-bootstrap";
import CourseCard from '../components/CourseCard';
// import { Navigate } from 'react-router-dom';
// import UserContext from '../UserContext';
// import { useContext } from 'react';

export default function Courses() {

	// const { user } = useContext(UserContext);
	const [courses, setCourses] =useState([])	

	useEffect(() => {
	fetch(`${process.env.REACT_APP_API_URL}/courses`)
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

	return (
		<Container>
			<h3 className="page-header text-center my-4 pt-2">Available Courses</h3>
			<Row sm={1} md={2} className="mx-auto">
					{courses}
			</Row>
		</Container>
	)
}