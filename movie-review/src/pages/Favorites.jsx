import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../store/reviews/actions";
import { useNavigate } from "react-router-dom";
import { clearFavorites, removeFavorite } from "../store/reviews/slice";

export default function Favorites() {
    const reviews = useSelector(selectFavorites);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!reviews || reviews.length === 0) {
        return <p className="text-center text-gray-500">No favorites yet.</p>;
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="border p-4 rounded-lg shadow-lg">
                    <h1 className="text-xl font-semibold text-[#064E2D]">{review.title}</h1>
                    <p className="text-gray-700">{review.reviewText}</p>
                    <div className="flex space-x-2 mt-4">
                        <button
                            onClick={() => navigate(`/reviews/${review.id}`)}
                            className="px-3 py-2 bg-[#064E2D] text-[#A9CDE5] text-sm rounded-lg hover:bg-[#A9CDE5] transition duration-300 font-medium shadow-sm"
                        >
                            Read more
                        </button>
                        <button
                            onClick={() => dispatch(removeFavorite(review.id))}
                            className="px-3 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition duration-300 font-medium shadow-sm"
                        >
                            Delete Favorite
                        </button>
                    </div>
                </div>
            ))}
            <div className="mt-6 text-center">
                <button
                    onClick={() => dispatch(clearFavorites())}
                    className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                    Clear favorites
                </button>
            </div>
        </div>
    );
}
