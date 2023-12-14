import React, { useEffect } from "react";
import Spotify from "../Util/Spotify";
import "./Track.css";

const Track = ({ track, addTrack, removeTrack, isInPlaylist, playlistId }) => {
  console.log("Track - Component Received Playlist ID:", playlistId);

  useEffect(() => {
    if (playlistId) {
      console.log("Track - useEffect - Playlist ID changed to:", playlistId);
    }
  }, [playlistId]);

  const handleAddTrack = async () => {
    if (!playlistId) {
      console.error("No playlist ID available");
      return;
    }

    const token = localStorage.getItem("spotify_access_token");
    const trackUri = track.uri;
    console.log("Track - Adding Track with Playlist ID:", playlistId, "and URI:", trackUri);

    try {
      // Ensure trackUri is passed as an array
      await Spotify.addTracksToPlaylist(playlistId, token, [trackUri]);
      addTrack(track);
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  const handleRemoveTrack = () => {
    if (!playlistId) {
      console.error("No playlist ID available");
      return;
    }
    console.log("Track - Removing Track with Playlist ID:", playlistId);
    removeTrack(track);
  };

  const trackName = track.name;
  const artistNames = track.artists.map((artist) => artist.name).join(", ");

  return (
    <div className="Track">
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
  );
};

export default Track;
