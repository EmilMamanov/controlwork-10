import { Typography } from '@mui/material';
import NewsForm from "./NewsForm.tsx";
import { useAppDispatch } from "../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { createNews } from "../store/newsThunks";
import { NewsMutation } from "../types";

const NewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFormSubmit = async (newsMutation: NewsMutation) => {
        await dispatch(createNews(newsMutation));
        navigate('/');
    };

    return (
        <>
            <Typography variant="h4">New post</Typography>
            <NewsForm onSubmit={onFormSubmit} />
        </>
    );
};

export default NewPost;