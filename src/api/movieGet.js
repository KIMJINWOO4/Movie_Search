export const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchMovies = async (query, page = 1) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`);
    const data = await response.json();
    return data;
};

export const fetchMovieDetail = async (id) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch movie detail error:', error);
        return { Response: 'False', Error: error.message };
    }
};
