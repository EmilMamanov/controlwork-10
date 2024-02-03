import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { deleteNews } from '../store/newsSlice';
import { useAppDispatch } from "../app/hooks.ts";


interface Props {
    id: string;
    title: string;
    content: string;
}





const NewsItem: React.FC<Props> = ({title, content, id}) => {

    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteNews(id));
    };

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card>
                <CardHeader title={title}/>
                <Button variant="outlined" color="secondary" onClick={handleDelete}>
                    Delete
                </Button>
                <CardContent>
                        content: {content}
                </CardContent>
                <CardActions>
                    <strong>
                        Read more
                    </strong>
                    <IconButton component={Link} to={'/news/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};


export default NewsItem;