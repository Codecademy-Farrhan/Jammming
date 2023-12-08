import React from 'react';
import './Track.css';

function Track({ track, onAdd, onRemove }) {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {onAdd && <button className="Track-action" onClick={() => onAdd(track)}>+</button>}
            {onRemove && <button className="Track-action" onClick={() => onRemove(track)}>-</button>}
        </div>
    );
}

export default Track;
