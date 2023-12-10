import React, { useState } from 'react';

import './SearchBar.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            console.log('Do search:', searchTerm); // Replace with actual search logic
        }
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" />
        </div>
    );
}

export default SearchBar;
