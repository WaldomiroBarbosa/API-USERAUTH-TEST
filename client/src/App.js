import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navigation from './Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


function App() 
{

  return (
    <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </Router>
  );

}

function Contact() 
{
  return <h1>Contact</h1>
}

export default App