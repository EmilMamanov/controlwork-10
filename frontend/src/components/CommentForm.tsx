import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
    onSubmit: (text: string) => void;
}

const CommentForm: React.FC<Props> = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(text);
        setText('');
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField
                        id="comment"
                        label="Add a comment"
                        value={text}
                        onChange={inputChangeHandler}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" color="primary" variant="contained">
                        Add Comment
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;
