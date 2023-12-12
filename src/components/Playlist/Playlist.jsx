import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

const Playlist = ({ playlistName, tracks }) => {
  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} />
      <Tracklist tracks={tracks} />
    </div>
  );
};

export default Playlist;
