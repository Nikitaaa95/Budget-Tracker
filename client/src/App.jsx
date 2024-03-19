import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './components/header';
import Footer from './components/footer';
import MainPage from './components/mainpage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ paddingTop: '10px'}}>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
