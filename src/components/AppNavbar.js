
import { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	return(
		<Navbar className="py-3 px-2" expand="lg" collapseOnSelect>
	      <Container>
	        <Navbar.Brand as={Link} to="/">Course Booking</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="d-flex align-items-center ms-auto">
	            <Nav.Link className="mx-2" as={Link} to="/" eventKey="1">Home</Nav.Link>
	            <Nav.Link className="mx-2" as={Link} to="/courses" eventKey="2">Courses</Nav.Link>
	            {
	            	user.id == null ?
	            	<>
	            		<Nav.Link className="mx-1" as={Link} to="/login" eventKey="3">
	            			<Button className="nav-login" variant="light">Log in</Button>
	            		</Nav.Link>
	            		<Nav.Link className="mx-1" as={Link} to="/register" eventKey="4">
	            			<Button className="nav-signup" variant="light">Sign Up</Button>
	            		</Nav.Link>
	            	</>
	            	:
	            	<>
	            	{
		            	user.isAdmin ?
		            	<Nav.Link className="mx-2" as={Link} to="/admin" eventKey="5">Manage</Nav.Link>
		            	:
		            	<Nav.Link className="mx-2" as={Link} to="/users/details" eventKey="6">Account</Nav.Link>
	            	}
	            	<Nav.Link className="mx-2" as={Link} to="/logout">Log out</Nav.Link>
	            	</>
	            }
	          </Nav>
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	)
}