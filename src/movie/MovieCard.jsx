import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <div className='bg-white text-black p-4 rounded-md shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105'>
            <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className='w-full h-64 object-cover rounded-md mb-4' />
                <h3 className='text-lg font-bold'>{movie.Title}</h3>
                <p className='text-gray-700'>{movie.Year}</p>
            </Link>
        </div>
    );
}

export default MovieCard;
