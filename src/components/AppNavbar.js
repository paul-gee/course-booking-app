
import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	return(
		<Navbar className="navbar py-3 px-2" expand="lg">
	      <Container>
	        <Navbar.Brand as={Link} to="/">Course Booking</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="ms-auto">
	            <Nav.Link className="mx-3" as={Link} to="/">Home</Nav.Link>
	            <Nav.Link className="mx-3" as={Link} to="/courses">Courses</Nav.Link>
	            {
	            	user.id !== null ?
	            	<>
	            	{
		            	user.isAdmin ?
		            	<Nav.Link className="mx-3" as={Link} to="/admin">Manage</Nav.Link>
		            	:
		            	<Nav.Link className="mx-3" as={Link} to="/users/details">Account</Nav.Link>
	            	}
	            	<Nav.Link className="mx-3" as={Link} to="/logout">Sign out</Nav.Link>
	            	</>
	            	:
	            	<>
	            		<Nav.Link className="mx-3" as={Link} to="/login">Sign in</Nav.Link>
	            		<Nav.Link className="mx-3" as={Link} to="/register">Register</Nav.Link>
	            	</>
	            }
	          </Nav>
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	)
}