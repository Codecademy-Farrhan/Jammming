import React from "react";

import Track from "../Track/Track";
import "./Playlist.css";

const Playlist = ({
  handleSavePlaylistToSpotify,
  playlistId,
  playlistName,
  playlistTracks,
  removeTrack,
  setPlaylistName,
}) => {
  console.log("Playlist - Received Playlist ID:", playlistId);

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const renderTracks = () => {
    if (!playlistId) {
      return <div>Loading...</div>; // Show a loading message or spinner
    }
  
    if (playlistTracks.length > 0) {
      return playlistTracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          playlistId={playlistId}
          removeTrack={removeTrack}
        />
      ));
    }
    return <div>No tracks available.</div>;
  };
    console.log("Playlist - Render with Playlist ID:", playlistId);

  return (
    <div className="Playlist">
      <div className="Playlist-input">
        <input
          value={playlistName}
          onChange={handleNameChange}
          placeholder="New Playlist"
        />
        <button
          onClick={handleSavePlaylistToSpotify}
          className="save-playlist-button"
        >
          ✔
        </button>
      </div>
      <div className="Playlist-tracks">
        {renderTracks()}
      </div>
    </div>
  );
};

export default Playlist;
