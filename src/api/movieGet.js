import axiosInstance from './axiosConfig';

export const fetchMovies = async (query, page = 1) => {
    try {
        const response = await axiosInstance.get('/', {
            params: {
                s: query,
                page: page,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch movies error:', error);
        return { Response: 'False', Error: error.message };
    }
};

export const fetchMovieDetail = async (id) => {
    try {
        const response = await axiosInstance.get('/', {
            params: {
                i: id,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetch movie detail error:', error);
        return { Response: 'False', Error: error.message };
    }
};
