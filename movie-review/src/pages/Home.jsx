import { useEffect, useState } from "react";
import * as movieApi from '../api/movie/movie';
import ReviewCard from "../components/ReviewCard";
import Search from "../components/Search";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleDelete = async (id) => {
        try {
            await movieApi.deleteMovie(id);
            setMovies(movies.filter(item => item.id !== id));
            setFilteredMovies(movies.filter(item => item.id !== id));
        } catch (error) {
            console.error("On delete error", error);
        }
    };

    const handleSearch = (query, filterBy) => {
        const lowerQuery = query.toLowerCase();

        const filtered = movies.filter((movie) => {
            const field = (movie[filterBy]).toString().toLowerCase();
            return field.includes(lowerQuery);
        });

        setFilteredMovies(filtered);
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchMovies = async () => {
            try {
                const data = await movieApi.getMovies();
                setMovies(data);
                setFilteredMovies(data);
            } catch (error) {
                console.error('An error loading:', error);
                setError(error.message || 'Failed to load movies-reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-center text-[#064E2D]">Loading...</p>}
            {error && <p className="text-center text-red-500">{`Error: ${error}`}</p>}

            <div className="mb-8">
                <Search onSearch={handleSearch} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map((item) => (
                    <ReviewCard key={item.id} movie={item} onDelete={handleDelete} />
                ))}
            </div>

            {filteredMovies.length === 0 && <p className="text-center text-gray-500 mt-6">No movies found.</p>}
        </div>
    );
}