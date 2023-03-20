
import React, { useState, useEffect, useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function Enrollments() {

	const { user } = useContext(UserContext);

	const [courseData, setCourseData] =useState([])

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/courses/`, {
        	headers:{
        		Authorization: `Bearer ${localStorage.getItem('token')}`
      		}
        })
        .then(res => res.json())
        .then(data => setCourseData(data));

	}, []);
		
	function createEnrolleesTable () {

		if (courseData.length === 0) {
			return (
				<Card className="mt-5 text-center">
					<h5 className="py-3">
						No Enrollments
					</h5>
				</Card>
			);
		}

		return (
			<Card className="mt-5">
				<Card.Header>
					<h5>Course Enrollees Record</h5>
					<h6><em>(Click a course to show enrollee record.)</em></h6>
				</Card.Header>
				<Card.Body className="admin-enrollees-table-container">
			      <Table className="admin-enrollees-table align-middle">
					<thead>
						<tr className="admin-enrollees-table-header align-middle">
							<th> # </th>
							<th> Course Name </th>
							<th> Course ID </th>
						</tr>
					</thead>
					<tbody>
						{courseData.map((course, index) => {
							const courseEntries = Object.entries(course).slice(0, 2).reverse();
							return (
								<React.Fragment key={index}>
									<tr
										className="table-row admin-enrollees-course-row"
										onClick={() => toggleCollapsibleRow(index)}
									>
									<th>{index + 1}  &crarr;</th>
									{courseEntries.map(([key, value]) => (
										<td key={key}>{JSON.stringify(value).replace(/["]/g, '')}</td>
									))}
									</tr>
									<tr className="collapsible-row" style={{ display: "none" }}>
										<td colSpan={courseEntries.length + 1}>
											{	
											course.enrollees.length === 0 ?
											<h6 className="text-center py-2"> No Enrollees Yet </h6>
											:
											<Table width="100%" className="align-middle">
												<thead>
													<tr>
														<th width="8%">#</th>
														<th width="32%">Enrollee ID</th>
														<th width="30%">Name</th>
														<th width="30%">Enrolled On</th>
													</tr>
												</thead>
												<tbody>
													{course.enrollees.map((enrollee, i) => {
														const enrolleeEntries = Object.values(enrollee).slice(0, 3);
														return (
															<tr key={i}>
															<th>{i + 1}</th>
																{enrolleeEntries.map((value, j) => (
																	<React.Fragment key={j}>
																		<td>{value}</td>
																	</React.Fragment>
																))}
															</tr>
														);
													})}
												</tbody>
											</Table>
											}
										</td>
									</tr>
								</React.Fragment>
							);
						})}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
    	);

	}

	function toggleCollapsibleRow(index) {
	    const collapsibleRow = document.querySelectorAll('.collapsible-row')[index];
	    if (collapsibleRow.style.display === 'table-row') {
	      collapsibleRow.style.display = 'none';
	    } else {
	      collapsibleRow.style.display = 'table-row';
	    }
  	}

  	if (user.isAdmin) {
		return createEnrolleesTable();
	} else {
		return (
			<Navigate to="/courses"/>
		)
	}
	
}