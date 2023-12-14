import React, { useState, useEffect } from "react";

import Playlist from "../Playlist/Playlist";
import Spotify from "../Util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify_Icon_RGB_Black from "../../assets/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Black.png";

import "./Dashboard.css";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Login
  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    // console.log("Dashboard - token:", token); // token check

    const fetchUserProfile = async () => {
      if (token) {
        const profileData = await Spotify.getUserProfile(token);
        // console.log("Dashboard - User Profile Data:", profileData); // data check
        setUserProfile(profileData);
      }
    };

    fetchUserProfile();
  }, []); // Run this effect when token changes

  // SearchResults
  const handleSearchData = (results) => {
    setSearchResults(results);
  };

  // Playlist
  const addTrack = (addTrack) => {
    setPlaylistTracks([...playlistTracks, addTrack]);
  };

  const removeTrack = (removeTrack) => {
    const newPlaylistTracks = playlistTracks.filter(
      (savedTrack) => savedTrack.id !== removeTrack.id
    );
    setPlaylistTracks(newPlaylistTracks);
  };

  const handleSavePlaylistToSpotify = async () => {
    const token = localStorage.getItem("spotify_access_token");
    const userId = userProfile.id;

    if (!playlistName) {
      alert("Please enter a playlist name.");
      return;
    }

    if (!playlistId) {
      // POST
      const createdPlaylistId = await Spotify.createPlaylist(
        playlistName,
        token,
        userId
      );
      setPlaylistId(createdPlaylistId);
    } else {
      // PUT
      await Spotify.updatePlaylistName(playlistId, token, playlistName);
    }
  };

  return (
    <>
      <div className="toolbar">
        <div className="logo-section">
          <img
            src={Spotify_Icon_RGB_Black}
            alt="Spotify Logo"
            className="dashboard-spotify-logo"
          />
        </div>
        <div className="searchbar-section">
          <SearchBar handleSearchData={handleSearchData} />
        </div>
        <div className="profile-section">
          {userProfile &&
            userProfile.images &&
            userProfile.images.length > 0 && (
              <img
                src={userProfile.images[0].url}
                alt="Profile"
                className="profile-image"
              />
            )}
          <p className="user-name">
            {userProfile ? userProfile.display_name : "Loading..."}
          </p>
        </div>
      </div>
      <div className="playlists-section">
        <Playlist
          handleSavePlaylistToSpotify={handleSavePlaylistToSpotify}
          playlistId={playlistId}
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          setPlaylistName={setPlaylistName}
          removeTrack={removeTrack}
        />
      </div>
      <div className="searchresults-section">
        <SearchResults
          searchResults={searchResults}
          addTrack={addTrack}
          playlistId={playlistId}
        />
      </div>
    </>
  );
};

export default Dashboard;
