import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../app/axiosApi';
import { News, NewsMutation } from '../types';

export const fetchNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
    const newsResponse = await axiosApi.get<News[]>('/news');
    return newsResponse.data;
});

export const fetchNewsById = createAsyncThunk<News | undefined, string>(
    'news/fetchById',
    async (id: string) => {
        try {
            const newsResponse = await axiosApi.get<News>(`/news/${id}`);
            return newsResponse.data;
        } catch (error) {
            throw error;
        }
    }
);

export const createNews = createAsyncThunk<null, NewsMutation>(
    'news/create',
    async (newsMutation) => {
        const serialized = {
            ...newsMutation,
        };
        return axiosApi.post('/news', serialized);
    }
);

export const fetchComments = createAsyncThunk<Comment[], string>(
    'news/fetchComments',
    async (newsId: string) => {
        try {
            const commentsResponse = await axiosApi.get<Comment[]>(`/comments`, { params: { news_id: newsId } });
            return commentsResponse.data;
        } catch (error) {
            throw error;
        }
    }
);

export const createComment = createAsyncThunk<Comment, { newsId: string; text: string }>(
    'news/createComment',
    async ({ newsId, text }) => {
        try {
            const commentResponse = await axiosApi.post<Comment>('/comments', { newsId, text });
            return commentResponse.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteComment = createAsyncThunk<void, string>(
    'news/deleteComment',
    async (commentId: string) => {
        try {
            await axiosApi.delete(`/comments/${commentId}`);
        } catch (error) {
            throw error;
        }
    }
);