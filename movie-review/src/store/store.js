import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './reviews/slice';

const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
    },
});

export default store;