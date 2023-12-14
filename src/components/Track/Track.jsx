import React, { useEffect } from "react";
import Spotify from "../Util/Spotify";
import "./Track.css";

const Track = ({
  track,
  addTrack,
  removeTrack,
  isInPlaylist,
  playlistId,
  source,
}) => {
  const handleAddTrack = async () => {
    if (!playlistId) {
      console.error("No playlist ID available");
      return;
    }

    const token = localStorage.getItem("spotify_access_token");
    const trackUri = track.uri;

    try {
      // Ensure trackUri is passed as an array
      await Spotify.addTracksToPlaylist(playlistId, token, [trackUri]);
      addTrack(track);
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  const handleRemoveTrack = async () => {
    if (!playlistId) {
      console.error("No playlist ID available");
      return; // Prevent further execution if playlistId is not set
    }

    const token = localStorage.getItem("spotify_access_token");
    const trackUri = track.uri;
    console.log("Track - Removing Track with Playlist ID:", playlistId);

    try {
      await Spotify.removeTrackFromPlaylist(playlistId, token, trackUri);
      removeTrack(track); // This should update your application's state
    } catch (error) {
      console.error("Error removing track from playlist:", error);
    }
  };

  const trackName = track.name;
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  const trackClass =
    source === "playlist" ? "Track playlist-track" : "Track search-track";

  return (
    <div className="Track">
      <div className={trackClass}>
        <div className="Track-information">
          <h3>{trackName}</h3>
          <p>{artistNames}</p>
        </div>
        {isInPlaylist ? (
          <button className="Track-action" onClick={handleRemoveTrack}>
            -
          </button>
        ) : (
          <button className="Track-action" onClick={handleAddTrack}>
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default Track;
