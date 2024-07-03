import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { fetchMovies } from '../api/movieGet';
import { ClipLoader } from 'react-spinners';

const MovieList = ({ movies, totalResults, loading, query }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentMovies, setCurrentMovies] = useState([]);
    const moviesPerPage = 10;
    const pagesPerBatch = 10;

    useEffect(() => {
        const fetchPageMovies = async () => {
            const data = await fetchMovies(query, currentPage);
            if (data.Response === 'True') {
                setCurrentMovies(data.Search);
            }
        };
        fetchPageMovies();
    }, [query, currentPage]);

    const totalPages = Math.ceil(totalResults / moviesPerPage);
    const currentBatch = Math.ceil(currentPage / pagesPerBatch);
    const startPage = (currentBatch - 1) * pagesPerBatch + 1;
    const endPage = Math.min(startPage + pagesPerBatch - 1, totalPages);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => (
        <div className='flex justify-center mt-6'>
            {startPage > 1 && (
                <button
                    className='p-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-blue-600 hover:text-white'
                    onClick={() => handlePageChange(startPage - pagesPerBatch)}
                >
                    &laquo;
                </button>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                    key={startPage + index}
                    className={`p-2 mx-1 ${
                        currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                    } rounded-md hover:bg-blue-600 hover:text-white`}
                    onClick={() => handlePageChange(startPage + index)}
                >
                    {startPage + index}
                </button>
            ))}
            {endPage < totalPages && (
                <button
                    className='p-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-blue-600 hover:text-white'
                    onClick={() => handlePageChange(startPage + pagesPerBatch)}
                >
                    &raquo;
                </button>
            )}
        </div>
    );

    return (
        <div className='p-4 pt-24 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 min-h-screen'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <ClipLoader color='#4A90E2' loading={loading} size={150} />
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {currentMovies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                    {totalPages > 1 && renderPagination()}
                </>
            )}
        </div>
    );
};

export default MovieList;
