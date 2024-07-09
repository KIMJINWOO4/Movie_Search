import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from './MovieCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchMovies } from '../api/movieGet';
import { ClipLoader } from 'react-spinners';

const MovieList = ({ query }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const observerRef = useRef(null);

    const fetchPageMovies = useCallback(
        async (page) => {
            setLoading(true);
            // 요청 전에 1초 대기
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const data = await fetchMovies(query, page);
            if (data.Response === 'True') {
                setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                setTotalResults(data.totalResults);
            }
            setLoading(false);
        },
        [query]
    );

    useEffect(() => {
        setMovies([]);
        setCurrentPage(1);
        fetchPageMovies(1);
    }, [query, fetchPageMovies]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchPageMovies(currentPage);
        }
    }, [currentPage, fetchPageMovies]);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && movies.length < totalResults) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        },
        [loading, movies.length, totalResults]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, option);

        const currentObserverRef = observerRef.current;
        if (currentObserverRef) observer.observe(currentObserverRef);

        return () => {
            if (currentObserverRef) observer.unobserve(currentObserverRef);
        };
    }, [handleObserver]);

    return (
        <div className='p-4 pt-24 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 min-h-screen'>
            <>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                    {loading && Array.from({ length: 10 }).map((_, index) => <SkeletonLoader key={index} />)}
                </div>
                {loading && (
                    <div className='flex justify-center items-center h-20'>
                        <ClipLoader color='#4A90E2' loading={loading} size={50} />
                    </div>
                )}
                <div ref={observerRef} className='h-10'></div>
            </>
        </div>
    );
};

export default MovieList;
