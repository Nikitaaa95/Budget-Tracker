import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './components/header';
import Footer from './components/footer';
import MainPage from './components/mainpage';
import Login from './components/login';
import Signup from './components/signup';
import Landing from './components/landingpage';


const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ paddingTop: '100px'}}>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landingpage" element={<Landing />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
