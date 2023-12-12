import React from 'react';
import Track from '../Track/Track';
import './Tracklist.css';

function Tracklist() {
    return (
        <div className="tracklist">
            {tracks.map(track => (
                <Track
                    key={track.id}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    // Add other track properties as needed
                />
            ))}
        </div>
    );

}


export default Tracklist;
