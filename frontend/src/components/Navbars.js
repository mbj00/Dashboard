import React from 'react'

import { Route, Link, Routes, useNavigate} from "react-router-dom";
import { Navbar, Nav} from 'react-bootstrap';

// import Home from './Home';
import Add from './Add';
import Profile from './Profile';
import Update from './Update';
import SignUp from './SignUp';
import Logins from './Logins';
import PrivateComponent from './PrivateComponent';
import ProductList from "./ProductList";

export default function Navbars() {
  const auth = localStorage.getItem('user');
  const nevigate = useNavigate();


  const logout = ()=>{
    console.log('logged out');
    localStorage.clear();
    nevigate('/signup');
  }

  return (
    <div>
      

      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home"><img src="..\logo512.png" alt="logo" className='logos'/>Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
               {auth ?
               <><Nav.Link ><Link to="/">Home</Link></Nav.Link>
               <Nav.Link ><Link to="/add">Add</Link></Nav.Link>
               <Nav.Link ><Link to="/update">Update</Link></Nav.Link>
               <Nav.Link ><Link to="/profile">Profile</Link></Nav.Link>
               <Nav.Link > <Link onClick={logout} to="/signup">Logout [{JSON.parse(auth).name}]</Link></Nav.Link></> :
               <><Nav.Link className='nav_link'><Link to="/signup">Sign Up</Link></Nav.Link>
               <Nav.Link className='nav_link'><Link to="/login"> Log In</Link></Nav.Link></>
              
              } 

            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<SignUp />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Logins />} />
        </Routes>

      
    </div>
  )
}
