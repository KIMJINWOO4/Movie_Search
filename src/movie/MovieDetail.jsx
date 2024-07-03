import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { API_KEY } from '../api/movieGet';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovie = async () => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
            const data = await response.json();
            setMovie(data);
            setLoading(false);
        };

        getMovie();
    }, [id]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <ClipLoader color='#4A90E2' loading={loading} size={150} />
            </div>
        );
    }

    return (
        <div className='p-4 pt-24 flex justify-center bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 min-h-screen'>
            <div className='bg-white text-black p-6 rounded-md shadow-md max-w-lg w-full'>
                <img src={movie.Poster} alt={movie.Title} className='w-full h-96 object-contain rounded-md mb-4' />
                <h3 className='text-2xl font-bold mb-2'>{movie.Title}</h3>
                <p className='text-gray-700'>{movie.Year}</p>
                <p className='mt-4'>{movie.Plot}</p>
                <p className='mt-2'>
                    <strong>감독:</strong> {movie.Director}
                </p>
                <p className='mt-2'>
                    <strong>배우:</strong> {movie.Actors}
                </p>
                <p className='mt-2'>
                    <strong>장르:</strong> {movie.Genre}
                </p>
            </div>
        </div>
    );
};

export default MovieDetail;
