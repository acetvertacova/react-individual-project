import { useEffect, useState } from 'react';
import * as movieApi from '../api/movie/movie';
import { useNavigate, useParams } from 'react-router-dom';

export default function ReviewDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchMovieReview = async () => {
            try {
                const data = await movieApi.getMovieById(id);
                setMovie(data);
            } catch (err) {
                console.error('An error loading:', err);
                setError('Failed to load review. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieReview();
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg text-gray-600">Loading...</p>;
    }

    if (notFound) {
        return <p className="text-center text-lg text-red-600">404 - Movie not found</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-600">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6 space-y-6">
            <h1 className="text-3xl font-semibold text-[#064E2D]">{movie.title} ({movie.year})</h1>
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-96 object-cover rounded-xl shadow-md" />

            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-[#064E2D]">Director:</h2>
                <p className="text-xl text-gray-700">{movie.director}</p>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-[#064E2D]">Genre:</h2>
                <ul className="list-disc ml-5 text-gray-700">
                    {movie.genre.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-[#064E2D]">Review:</h2>
                <p className="text-lg text-gray-600">{movie.reviewTitle}</p>
                <p className="text-lg text-gray-600">{movie.reviewDescription}</p>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#064E2D]">Rating:</h3>
                <p className="text-lg text-yellow-500">⭐ {movie.rating}/10</p>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#064E2D]">Actors:</h3>
                <ul className="list-disc ml-5 text-gray-700">
                    {movie.actors.map((actor, index) => (
                        <li key={index}>{actor}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#064E2D]">Tags:</h3>
                <div className="flex gap-2 flex-wrap">
                    {movie.tags && movie.tags.map((tag, index) => (
                        <span key={index} className="bg-[#A9CDE5] text-[#064E2D] px-3 py-1 rounded-lg text-sm">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#064E2D]">Review Release Date:</h3>
                <p className="text-lg text-gray-700">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
}