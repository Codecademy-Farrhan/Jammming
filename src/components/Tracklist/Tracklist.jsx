import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

const Tracklist = ({ playlistTracks }) => {
  return (
    <div className="Tracklist">
      {playlistTracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};

export default Tracklist;
