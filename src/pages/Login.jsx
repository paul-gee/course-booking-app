import { useState, useEffect, useContext } from 'react';
import { Card, Form, Button, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { API_BASE_URL } from '../constants/app.js';
import useSweetAlert from '../hooks/useSweetAlert.js';


export default function Login() {
  const navigate = useNavigate();
  const { openAlert } = useSweetAlert();
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const { setUser } = useContext(UserContext);
  const [isActive, setIsActive] = useState (false);
  
  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [email, password])

  function authenticate(e) {
    e.preventDefault()
    
    fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {

        if (typeof data.access !== "undefined") {
          localStorage.setItem('token', data.access)
          retrieveUserDetails(data.access)

          openAlert({
            title: "Login Successful!",
            text: "Welcome to Course Booking!",
          });
          navigate("/")
        } else {
          openAlert('error', {
            title: "Authentication Failed!",
            text: "Check your credentials!",
          });
        }
      })

      const retrieveUserDetails = (token) => {
        fetch(`${API_BASE_URL}/users/details`, {
          headers: { Authorization: `Bearer ${token}` }
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
              <Button variant="primary" type="submit" id="submitBtn" disabled={!isActive}>
                Log in
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
