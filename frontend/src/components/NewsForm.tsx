import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import FileInput from './FileInput';
import { NewsMutation } from '../types';

interface Props {
    onSubmit: (newsMutation: NewsMutation) => Promise<void>;
}

const NewsForm: React.FC<Props> = ({ onSubmit }) => {
    const [state, setState] = useState<NewsMutation>({
        title: '',
        content: '',
        image: null,
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="content"
                        label="Content"
                        value={state.content}
                        onChange={inputChangeHandler}
                        name="content"
                    />
                </Grid>
                <Grid item xs>
                    <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
                </Grid>
                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">
                        Add new post
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewsForm;
