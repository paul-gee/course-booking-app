
import { useEffect, useState, useContext } from 'react';
import { Container, Row } from "react-bootstrap";
// import { Navigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import UserContext from '../UserContext';

export default function Courses() {

	const [courses, setCourses] =useState([])

	const { user } = useContext(UserContext);

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
			<h3 className="page-header text-center my-5 pt-2">Available Courses</h3>
			<Row sm={1} md={2}>
					{courses}
			</Row>
		</Container>
	)
}