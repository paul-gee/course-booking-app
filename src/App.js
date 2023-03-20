
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseView from './components/CourseView';
import Dash from './components/Dash';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import Enrollments from './components/Enrollments';
import Register from './pages/Register';
import Account from './pages/Account';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import './App.css';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })


  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if (typeof data._id !== "undefined") {;
        setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.mobileNo,
            enrollments: data.enrollments
          });
      } else {
        setUser ({
          id: null,
          isAdmin: null
        })
      }
    })
  },[]);

  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container className="main-container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/users/details" element={<Account/>}/>
              <Route path="/admin" element={<Dash/>}/>
              <Route path="/addCourse" element={<AddCourse/>} />
              <Route path="/editCourse/:courseId" element={<EditCourse/>} />
              <Route path="/admin/enrollments" element={<Enrollments/>}/>
              <Route path="/courses" element={<Courses/>}/>
              <Route path="/courses/:courseId" element={<CourseView/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
          </Container>
          <Footer/>
        </Router>
    </UserProvider>
  );
}

export default App;
