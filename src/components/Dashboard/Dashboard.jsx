import React, { useState, useEffect } from 'react';
import Spotify from '../Util/Spotify';

import './Dashboard.css'

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    console.log("Dashboard - Using Token:", token);

    const fetchUserProfile = async () => {
      if (token) {
        const profileData = await Spotify.getUserProfile(token);
        console.log("Dashboard - User Profile Data:", profileData);
        setUserProfile(profileData);
      }
    };

    fetchUserProfile();
  }, []);  // Run this effect when token changes

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="toolbar">
      <div className="profile-section">
        {userProfile.images && userProfile.images.length > 0 && (
          <img src={userProfile.images[0].url} alt="Profile" className="profile-image" />
        )}
        <p className="user-name">{userProfile.display_name}</p>
      </div>
    </div>
  );
};

export default Dashboard;
