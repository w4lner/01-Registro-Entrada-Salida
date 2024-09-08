import React from 'react';
import './App.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Notificar del cambio al componente padre
            style={{ marginBottom: '20px', padding: '10px', width: '300px', fontSize: '16px' }}
        />
    );
};

export default SearchBar;