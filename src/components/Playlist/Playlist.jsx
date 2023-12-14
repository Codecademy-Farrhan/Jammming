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

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const renderTracks = () => {
    if (playlistTracks.length > 0) {
      return playlistTracks.map((track) => (
        <Track
          isInPlaylist={true}
          key={track.id}
          playlistId={playlistId}
          track={track}
          removeTrack={removeTrack}
          source="playlist"
        />
      ));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSavePlaylistToSpotify();
    }
  };
    
  return (
    <div className="Playlist">
      <div className="Playlist-input">
        <input
          value={playlistName}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          placeholder="New Playlist"
        />
        {/* You can remove the button if it's no longer needed */}
      </div>
      <div className="Playlist-tracks">{renderTracks()}</div>
    </div>
  );
  
  
};

export default Playlist;
