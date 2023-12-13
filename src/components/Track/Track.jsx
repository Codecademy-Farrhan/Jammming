import React from "react";
import "./Track.css";

const Track = ({ track, addTrack, removeTrack, isInPlaylist }) => {
  const handleAddTrack = () => {
    addTrack(track);
  };

  const handleRemoveTrack = () => {
    removeTrack(track);
  };

  const trackName = track.name;
  const artistNames = track.artists.map((artist) => artist.name).join(", ");

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{`${artistNames}`}</p>
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
