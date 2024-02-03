import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { Comment } from '../types';

interface Props {
    comments: Comment[];
}

const CommentList: React.FC<Props> = ({ comments }) => {
    return (
        <List>
            {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                    <ListItem>
                        <ListItemText>{comment.text}</ListItemText>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default CommentList;
