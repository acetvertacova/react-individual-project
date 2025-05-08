import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavorites } from "../store/favorites/actions";

export default function Header() {
    const reviews = useSelector(selectFavorites);
    const totalReviews = reviews.length;

    return (
        <header className="bg-[#064E2D] text-white p-4 shadow-lg">
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold">
                    Movie Reviews
                </h1>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-[#A9CDE5] transition duration-300">
                        Home
                    </Link>
                    <Link to="/fav" className="hover:text-[#A9CDE5] transition duration-300">
                        Favorites ({totalReviews})
                    </Link>
                    <Link to="/form/create" className="bg-[#A9CDE5] text-[#064E2D] py-2 px-4 rounded-lg hover:bg-[#064E2D] hover:text-white transition duration-300">
                        Create Review
                    </Link>
                </div>
            </nav>
        </header>
    );
}
