import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../app/axiosApi';
import { RootState } from '../app/store';
import { Comment } from '../types';

interface CommentsState {
    items: Record<string, Comment[]>;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsState = {
    items: {},
    fetchLoading: false,
    createLoading: false,
};

export const fetchComments = createAsyncThunk<Comment[], string>(
    'comments/fetchComments',
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
        try {
            const commentResponse = await axiosApi.post<Comment>('/comments', { newsId, text });
            return commentResponse.data;
        } catch (error) {
            throw error;
        }
    }
);

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
            const { newsId } = action.payload;
            state.items[newsId] = state.items[newsId] || [];
            state.items[newsId].push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const newsId = action.meta.arg;
                state.items[newsId] = action.payload;
                state.fetchLoading = false;
            })
            .addCase(createComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const newsId = action.payload.newsId;
                state.items[newsId] = state.items[newsId] || [];
                state.items[newsId].push(action.payload);
                state.createLoading = false;
            });
    },
});

export const selectComments = (state: RootState, newsId: string) => state.comments.items[newsId] || [];
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading || state.comments.createLoading;

export const { reducer: commentsReducer, actions } = commentsSlice;
export const { addComment } = actions;

export default commentsSlice.reducer;
