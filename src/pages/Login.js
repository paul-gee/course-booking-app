import {Card, Form, Button, Col, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Login() {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [isActive, setIsActive] = useState ('');

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function authenticate(e) {

      e.preventDefault()

      fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {

        //console.log(data);

        if (typeof data.access !== "undefined") {
          localStorage.setItem('token',data.access)
          retrieveUserDetails(data.access)

          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            text: "Welcome to Course Booking!",
            confirmButtonColor: "#23857a"
          });

          navigate("/courses")

        } else {

          Swal.fire({
            title: "Authentication Failed!",
            icon: "error",
            text: "Check your credentials!",
            confirmButtonColor: "#23857a" 
          });
          
        }
      })

      const retrieveUserDetails = (token) => {

        //REACT_APP_API_URL=http://localhost:4000

        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.mobileNo,
            enrollments: data.enrollments
          });
        })
      }
      setEmail("");
      setPassword("");
  }

  useEffect(() => {

    if (email !== "" && password !== "") {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
 
  }, [email, password])


  return (
    
    <Col xs={10} sm={8} md={6} lg={4} className="mx-auto my-5">
      <h4 className="login-title text-center py-2">Sign in to Course Booking</h4>
      <Card className="login-card px-2">
        <Card.Body>
          <Form onSubmit={e => authenticate(e)}>
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              />
            </Form.Group>

            <Container className="text-center">
            { isActive ?
            <Button variant="primary" type="submit" id="submitBtn">
              Log in
            </Button>
            :
            <Button variant="primary" type="submit" id="submitBtn" disabled>
              Log in
            </Button>
            }
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Col>
    
  );
}
