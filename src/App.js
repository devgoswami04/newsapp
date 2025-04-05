import './App.css';
import "./components/navbar.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";  

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<News key="General" pageSize={6} country="us" category="General" />} />
            <Route exact path="/business" element={<News key="Business" pageSize={6} country="us" category="Business" />} />
            <Route exact path="/entertainment" element={<News key="Entertainment" pageSize={6} country="us" category="Entertainment" />} />
            <Route exact path="/general" element={<News key="General" pageSize={6} country="us" category="General" />} />
            <Route exact path="/health" element={<News key="Health" pageSize={6} country="us" category="Health" />} />
            <Route exact path="/science" element={<News key="Science" pageSize={6} country="us" category="Science" />} />
            <Route exact path="/sports" element={<News key="Sports" pageSize={6} country="us" category="Sports" />} />
            <Route exact path="/technology" element={<News key="Technology" pageSize={6} country="us" category="Technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
