import { useState } from "react";

export default function Search({ onSearch }) {
    const [search, setSearch] = useState("");
    const [filterBy, setFilterBy] = useState("title");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value, filterBy);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterBy(value);
        onSearch(search, value);
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-w-xl mx-auto mt-8">
            <select
                value={filterBy}
                onChange={handleFilterChange}
                className="px-4 py-2 bg-[#F7FAF9] border border-[#C5D1D8] rounded-lg shadow-md text-[#064E2D] focus:ring-2 focus:ring-[#64A9B9] focus:outline-none focus:border-[#064E2D] transition duration-200 ease-in-out"
            >
                <option value="title">Title</option>
                <option value="director">Director</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
            </select>

            <input
                type="text"
                placeholder={`Search by ${filterBy}...`}
                onChange={handleSearchChange}
                value={search}
                className="px-4 py-2 bg-[#F7FAF9] border border-[#C5D1D8] rounded-lg shadow-md text-[#064E2D] focus:ring-2 focus:ring-[#64A9B9] focus:outline-none focus:border-[#064E2D] transition duration-200 ease-in-out"
            />
        </div>
    );
}
