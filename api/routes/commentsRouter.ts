import express, { Router } from 'express';
import fileDb from '../fileDb';
import { Comment } from '../types';
import crypto from 'crypto';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { news_id } = req.query;
        if (news_id) {
            const comments = await fileDb.getComments(news_id.toString());
            return res.json(comments);
        }

        const allComments = await fileDb.getComments("");
        res.json(allComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { newsId, author, text } = req.body;

        if (!newsId || !text) {
            return res.status(400).json({ error: 'News ID and text are required fields' });
        }

        const news = await fileDb.getNewsById(newsId);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        const newComment: Comment = {
            id: crypto.randomUUID(),
            newsId,
            author: author || 'Anonymous',
            text,
        };

        await fileDb.saveComment(newComment);

        res.json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await fileDb.getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await fileDb.deleteComment(commentId);

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
