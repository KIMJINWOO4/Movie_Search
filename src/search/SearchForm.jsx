import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex justify-center py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg fixed top-0 left-0 right-0 z-10'
        >
            <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='p-2 rounded-l-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500'
                placeholder='Search for movies...'
            />
            <button type='submit' className='p-2 bg-pink-600 text-white rounded-r-md hover:bg-pink-700'>
                Search
            </button>
        </form>
    );
};

export default SearchForm;
