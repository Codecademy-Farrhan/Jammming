import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

const Playlist = ({ playlistName, setPlaylistName, playlistTracks, removeTrack }) => {
  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  return (
    <div className="Playlist">
      <input
        value={playlistName}
        onChange={handleNameChange}
        placeholder="New Playlist"
      />
      <div className="Playlist-tracks">
        {playlistTracks.map(track => (
          <div key={track.id} className="Playlist-track">
            <span>{track.name}</span>
            <button onClick={() => removeTrack(track)} className="Playlist-track-action">-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
