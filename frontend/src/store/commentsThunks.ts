import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../app/axiosApi';
import { Comment } from '../types';

export const fetchCommentsById = createAsyncThunk<Comment[], string>(
    'comments/fetchCommentsById',
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
    'comments/createComment',
    async ({ newsId, text }, { dispatch, getState }) => {
        try {
            const commentResponse = await axiosApi.post<Comment>('/comments', { newsId, text });
            dispatch(fetchCommentsById(newsId));
            return commentResponse.data;
        } catch (error) {
            throw error;
        }
    }
);