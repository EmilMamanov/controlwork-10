import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { News } from '../types';
import { fetchNews, createNews } from './newsThunks';

interface NewsState {
    items: News[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: NewsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const selectNewsCreating = (state: RootState) => state.news.createLoading;

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });

        builder.addCase(createNews.pending, (state) => {
            state.createLoading = true;
        });

        builder.addCase(createNews.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createNews.rejected, (state) => {
            state.createLoading = false;
        });
    },
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.items;
export const selectNewsLoading = (state: RootState) => state.news.fetchLoading;
