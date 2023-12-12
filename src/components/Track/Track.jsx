import React from 'react';
import './Track.css';

const Track = ({ track }) => {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{`${track.artist} | ${track.album}`}</p>
        </div>
        {/* Add code to manage track actions like 'add' or 'remove' */}
      </div>
    );
};

export default Track;
