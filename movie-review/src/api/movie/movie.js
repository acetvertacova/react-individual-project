import { mergeConfig } from 'axios';
import api from '../api';

export const getMovies = async () => {
    const response = await api.get('/movie');
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
};

export const createMovie = async (movie) => {
    const response = await api.post('/movie', movie);
    return response.data;
};

export const updateMovie = async (id, movie) => {
    const response = await api.put(`/movie/${id}`, movie);
    return response.data;
};

export const deleteMovie = async (id) => {
    await api.delete(`/movie/${id}`);
};