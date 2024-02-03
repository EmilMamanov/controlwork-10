import { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch  } from '../app/hooks';
import {  selectNews, selectNewsLoading } from '../store/newsSlice';
import { fetchNews } from '../store/newsThunks';
import NewsItem from './NewsItem';

const NewsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const news = useSelector(selectNews);
    const loading = useSelector(selectNewsLoading);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);


    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">News</Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" component={Link} to="/news/new">
                        Add new post
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Grid container spacing={2}>
                    {news.map((item) => (
                        <NewsItem key={item.id} id={item.id} title={item.title} content={item.content} />
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default NewsList;
