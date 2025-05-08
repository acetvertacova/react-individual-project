import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorites/slice';

const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
    },
});

export default store;