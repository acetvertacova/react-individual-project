import { createSlice } from '@reduxjs/toolkit';

const reviews = localStorage.getItem('reviews') != null
    ? JSON.parse(localStorage.getItem('reviews'))
    : [];
const saveToLocalStorage = (item) => {
    localStorage.setItem('reviews', JSON.stringify(item));
}

const initialState = {
    reviews: reviews,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites(state, action) {
            const review = state.reviews.find(item => item.id === action.payload.id);
            if (!review) {
                state.reviews.push(action.payload);
                saveToLocalStorage(state.reviews);
            }
        },
        removeFavorite(state, action) {
            state.reviews = state.reviews.filter(item => item.id !== action.payload);
            saveToLocalStorage(state.reviews);
        },
        clearFavorites(state) {
            state.reviews = [];
            saveToLocalStorage([]);
        },
    },
});

export const { addToFavorites, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;