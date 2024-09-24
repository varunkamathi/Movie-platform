import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">Movie Platform</h1>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="p-2 rounded w-64"
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
