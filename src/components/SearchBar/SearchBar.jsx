import React, { useState } from "react";

import "./SearchBar.css";

function SearchBar() {
  const token = localStorage.getItem("spotify_access_token");
  console.log("SearchBar - token:", token);
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      console.log("Search Artist, Song or Album:", searchTerm);
      if (!token) {
        console.log("No token available.");
        return;
      }

      try {
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

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const searchData = await response.json();
        console.log("Search Data:", searchData);
      } catch (error) {
        console.error("Search Failed:", error);
      }
    }
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="Search Bar"
      />
    </div>
  );
}

export default SearchBar;
