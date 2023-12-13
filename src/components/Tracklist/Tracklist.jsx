import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

const Tracklist = ({ tracks, addTrack, removeTrack, isInPlaylist }) => {
  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track 
          key={track.id} 
          track={track} 
          addTrack={addTrack} 
          removeTrack={removeTrack}
          isInPlaylist={isInPlaylist} 
        />
      ))}
    </div>
  );
};


export default Tracklist;
