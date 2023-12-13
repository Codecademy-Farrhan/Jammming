import React from "react";

import Track from '../Track/Track';
import "./SearchResults.css";

const SearchResults = ({ searchResults, addTrack }) => {
  const tracks = searchResults.tracks?.items || [];

  tracks.map((track) => (
    <Track key={track.id} track={track} addTrack={() => addTrack(track)} />
  ));

  return (
    <div className="SearchResults">
      {tracks.map((track) => (
        <Track 
          key={track.id} 
          track={track} 
          addTrack={() => addTrack(track)} 
          isInPlaylist={false}
        />
      ))}
    </div>
  );
};

export default SearchResults;
