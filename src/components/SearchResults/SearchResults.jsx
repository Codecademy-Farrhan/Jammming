import React from "react";
import "../SearchBar/SearchBar";
import "./SearchResults.css";
import Spotify_Icon_RGB_Green from "../../assets/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";

const SearchResults = ({ searchResults }) => {
  const tracks = searchResults.tracks?.items || [];

  return (
    <div className="SearchResults">
      {tracks.map((track) => (
        <div key={track.id} className="track">
          <div className="track-details">
            <p className="track-name">{track.name}</p>
            <p className="artist-name">
              {track.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
          <a href={track.external_urls.spotify}>
            <img
              src={Spotify_Icon_RGB_Green}
              alt="Listen on Spotify"
              className="listen-logo"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
