import React, { useState } from "react";

import "./SearchBar.css";

const SearchBar = ({ handleSearchData, playlistId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("spotify_access_token");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      if (!playlistId) {
        alert("Please create a playlist first.");
        return;
      }

      if (!token) {
        console.log("No token available.");
        return;
      }

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchTerm
        )}&type=track,album,artist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const searchData = await response.json();
      handleSearchData(searchData);
    }
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="Search Bar"
      />
    </div>
  );
};

export default SearchBar;
