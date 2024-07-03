import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './search/SearchForm';
import MovieList from './movie/MovieList';
import MovieDetail from './movie/MovieDetail';
import { fetchMovies } from './api/movieGet';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const handleSearch = async (searchTerm) => {
        setLoading(true);
        setQuery(searchTerm);
        const data = await fetchMovies(searchTerm);
        if (data.Response === 'True') {
            setMovies(data.Search);
            setTotalResults(data.totalResults);
        } else {
            setMovies([]);
            setTotalResults(0);
        }
        setLoading(false);
    };

    return (
        <Router>
            <div className='fixed w-full bg-white shadow-md z-10'>
                <SearchForm onSearch={handleSearch} />
            </div>
            <Routes>
                <Route
                    path='/'
                    element={<MovieList movies={movies} totalResults={totalResults} loading={loading} query={query} />}
                />
                <Route path='/movie/:id' element={<MovieDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
