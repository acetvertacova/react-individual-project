import { useNavigate } from "react-router-dom";
import { addToFavorites } from "../store/reviews/slice";
import { useDispatch } from "react-redux";
import { HeartIcon } from '@heroicons/react/24/solid';

export default function ReviewCard({ movie, onDelete }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addToFavorites(movie));
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden w-80 h-auto transition-transform duration-300 hover:scale-105 border border-gray-200">
            {/* Poster Image */}
            <div className="relative">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#064E2D]/90 to-transparent h-16"></div>
            </div>

            {/* Title */}
            <div className="p-4 bg-white">
                <h2 className="text-2xl font-bold text-[#064E2D] hover:text-[#A9CDE5] transition-colors mb-2">
                    {movie.title} ({movie.year})
                </h2>
                <div className="text-sm text-gray-600">
                    <strong className="text-[#064E2D]">Genre:</strong> {movie.genre.join(", ")}
                </div>

                {/* Review Title */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{movie.reviewTitle}</p>

                {/* Rating */}
                <p className="text-sm text-[#064E2D] font-medium mt-2">⭐ {movie.rating}/10</p>

                {/* Actors */}
                <div className="mt-2">
                    <strong className="text-[#064E2D]">Actors:</strong>
                    <ul className="list-disc ml-5 text-gray-700">
                        {movie.actors.slice(0, 3).map((actor, index) => (
                            <li key={index}>{actor}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 border-t border-gray-100">
                <button
                    onClick={() => navigate(`/reviews/${movie.id}`)}
                    className="px-3 py-2 bg-[#064E2D] text-[#A9CDE5] text-sm rounded-lg hover:bg-[#A9CDE5] transition duration-300 font-medium shadow-sm"
                >
                    Read more
                </button>

                <button
                    onClick={handleAdd}
                    className="px-3 py-2 bg-white text-indigo-600 border border-indigo-300 text-sm rounded-lg hover:bg-indigo-50 transition duration-300 flex items-center justify-center gap-1 font-medium shadow-sm"
                >
                    <HeartIcon className="w-4 h-4 text-pink-500" />
                    Favorite
                </button>

                <button
                    onClick={() => navigate(`/form/${movie.id}/edit`)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition duration-300 font-medium shadow-sm"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(movie.id)}
                    className="px-3 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition duration-300 font-medium shadow-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}