
import { Card, Form, Button, Col, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {

  // const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isActive, setIsActive] = useState(false);

  function registerUser(e){

    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (data === true) {

          Swal.fire({
          title: "Duplicate Email Found!",
          icon: "error",
          text: "Kindly provide another email to complete the registration!",
          confirmButtonColor: "#23857a"
        })

      } else {

        fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNo: mobileNo,
            password: password1
          })
        })
        .then(res => res.json())
        .then(data => {

          if (data === true) {

            setFirstName("");
            setLastName("");
            setEmail("");
            setMobileNo("");
            setPassword1("");
            setPassword2("");

            Swal.fire({
              title: "Registration successful!",
              icon: "success",
              text: "Welcome to Course Booking!",
              confirmButtonColor: "#23857a"
            })

            navigate("/login")

          } else {

            Swal.fire({
              title: "Something went wrong!",
              icon: "error",
              text: "Please try again!",
              confirmButtonColor: "#23857a"

          })
        }
      })
    }
  })

  }


  useEffect(() => {

    if ((firstName !== "" && lastName !== "" && mobileNo.length === 11 && email !== "" && password1 !== "" && password2 !== "")&&(password1 === password2)){
      setIsActive(true)
    } else {
      setIsActive(false)
    }

  },[firstName, lastName, email, mobileNo, password1, password2])


  return (
    <Col xs={10} sm={8} md={6} lg={4} className="mx-auto my-5">
      <h4 className="register-title text-center py-2">Register to Get Started</h4>
      <Card className="signup-card px-2">
        <Card.Body>
          <Form onSubmit={e => registerUser(e)}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              type="email"
              placeholder="Enter a valid email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="mobileNo">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
              type="text"
              placeholder="Mobile number must be 11 digits"
              value={mobileNo}
              onChange={e => setMobileNo(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Password"
              value={password1}
              onChange={e => setPassword1(e.target.value)}
              required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Verify password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              required/>
            </Form.Group>

            <Container className="text-center">
              { isActive ?      
                  <Button variant="primary" type="submit" id="submitBtn">
                      Create Account
                  </Button>
                :
                  <Button variant="primary" type="submit" id="submitBtn" disabled>
                      Create Account
                  </Button>
              }
            </Container>

          </Form>
        </Card.Body>
      </Card>
    </Col>  
  );
}