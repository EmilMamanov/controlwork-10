import express, { Router } from 'express';
import crypto from 'crypto';
import { uploadItemImage } from '../multer';
import { News } from '../types';
import fileDb from "../fileDb";

const router: Router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const news = await fileDb.getNews();
        const simplifiedNews = news.map(({ id, title, publicationDate, image }) => ({ id, title, publicationDate, image }));
        res.json(simplifiedNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const newsId = req.params.id;
        const news = await fileDb.getNewsById(newsId);

        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', uploadItemImage.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required fields' });
        }

        const newNews: News = {
            id: crypto.randomUUID(),
            title,
            content,
            image: req.file ? req.file.filename : null,
            publicationDate: new Date().toISOString(),
        };

        await fileDb.saveNews(newNews);

        res.json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const newsId = req.params.id;

        const news = await fileDb.getNewsById(newsId);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        await fileDb.deleteNews(newsId);

        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
