import React from "react";
import Track from "../Track/Track";
import "./SearchResults.css";

const SearchResults = ({ searchResults, addTrack, playlistId }) => {
  const tracks = searchResults.tracks?.items || [];

  return (
    <div className="SearchResults">
      {tracks.map((track) => {
        if (playlistId) {
          return (
            <Track
              addTrack={() => addTrack(track)}
              isInPlaylist={false}
              key={track.id}
              playlistId={playlistId}
              track={track}
              source="search"
            />
          );
        } else {
          return null; // Or some placeholder indicating that a playlist needs to be selected
        }
      })}
    </div>
  );
};

export default SearchResults;
