import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { selectNews } from '../store/newsSlice';
import { fetchNewsById } from '../store/newsThunks';
import { useAppDispatch, useAppSelector  } from '../app/hooks';
import axiosApi from '../app/axiosApi.ts';
import { Grid, Typography} from "@mui/material";
import CommentForm from "./CommentForm.tsx";

interface Props {}

const NewsDetails: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);
    const selectedNews = news.find((item) => item.id === id)!;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultAction = await dispatch(fetchNewsById(id));
                if (fetchNewsById.fulfilled.match(resultAction)) {
                    console.log('Fetched data:', resultAction.payload);
                } else {
                    console.error('Error fetching news by id:', resultAction.error);
                }
            } catch (error) {
                console.error('Error dispatching fetchNewsById:', error);
            }
        };

        if (!selectedNews || !('content' in selectedNews) || selectedNews.content === null) {
            fetchData();
        }
    }, [dispatch, id, selectedNews]);

    const addCommentHandler = async (commentText: string) => {
        try {
            const newComment = await axiosApi.addComment(selectedNews.id, commentText);

            dispatch(addComment(newComment));


            console.log('Adding comment:', newComment);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (!selectedNews) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{selectedNews.title}</h2>
            {selectedNews.content !== null ? (
                <p>{selectedNews.content}</p>
            ) : (
                <p>No content available.</p>
            )}
            <p>{selectedNews.publicationDate}</p>
            <Grid item>
                <Typography variant="h4">News</Typography>
            </Grid>
            <Grid item>
                <CommentForm onSubmit={addCommentHandler} />
            </Grid>
        </div>

    );
};

export default NewsDetails;