import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

const Playlist = ({ playlistName, setPlaylistName, playlistTracks }) => {
  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} placeholder="My Playlist"/>
      <Tracklist playlistTracks={playlistTracks} />
    </div>
  );
};

export default Playlist;
