import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Spotify from "../Util/Spotify";
import CallbackHandler from '../Util/CallbackHandler';

import "./App.css";

function App() {
  
  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    console.log("App - token:", token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<CallbackHandler />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
  
}

export default App;
