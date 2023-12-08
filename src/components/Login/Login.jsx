import React, { useState } from 'react';
import Spotify from '../Util/Spotify';
import './Login.css';
import SpotifyLogo from './SpotifyLogo.jpg'

const Login = () => {

  const handleLogin = () => {
    Spotify.redirectToSpotifyLogin();
  };

  return (
    <div className='login-container'>

      <input 
        type='text' 
        placeholder='Username' 
        className='login-input'
      />

      <input 
        type='password' 
        placeholder='Password' 
        className='login-input'
      />

      <div className="spotify-login-section">
        <img src={SpotifyLogo} alt="Spotify Logo" className="spotify-logo" />
        <button onClick={handleLogin} className='login-button'>
          Log in with Spotify
        </button>
      </div>

      <a href='#forgot' className='forgot-password-link'>Forgot Password?</a>
      <div className='create-account-container'>
        <a href='#create' className='create-account-link'>Create Account</a>
      </div>
    </div>
  );
};

export default Login;
