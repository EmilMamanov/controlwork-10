import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../app/axiosApi';
import { Comment } from '../types';
import { useAppDispatch } from '../app/hooks';

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
    async ({ newsId, text }) => {
        const dispatch = useAppDispatch();  // Используем хук useAppDispatch
        try {
            const commentResponse = await axiosApi.post<Comment>('/comments', { newsId, text });
            dispatch(fetchCommentsById(newsId));  // Используем fetchCommentsById
            return commentResponse.data;
        } catch (error) {
            throw error;
        }
    }
);