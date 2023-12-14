import React from "react";
import Track from "../Track/Track";
import "./SearchResults.css";

const SearchResults = ({ searchResults, addTrack, playlistId }) => {
  const tracks = searchResults.tracks?.items || [];

  return (
    <div className="SearchResults">
      {tracks.map((track) => (
        <Track
          addTrack={() => addTrack(track)}
          isInPlaylist={false}
          key={track.id}
          playlistId={playlistId}
          track={track}
          source="search"
        />
      ))}
    </div>
  );
};

export default SearchResults;
