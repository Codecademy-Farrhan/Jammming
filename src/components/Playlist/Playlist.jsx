import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

const Playlist = ({ playlistName, playlistTracks, onNameChange, onRemove }) => {
    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    return (
        <div className="Playlist">
            <input value={playlistName} onChange={handleNameChange} />
            <Tracklist tracks={playlistTracks} onRemove={onRemove} />
        </div>
    );
}


export default Playlist;
