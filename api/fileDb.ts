import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { News, Comment } from './types';

const dataPath = path.join(__dirname, 'data');
const newsFilePath = path.join(dataPath, 'news.json');
const commentsFilePath = path.join(dataPath, 'comments.json');

async function initializeDataFiles() {
    try {
        await fs.access(dataPath);
    } catch (error) {
        await fs.mkdir(dataPath);
    }

    const initializeFile = async (filePath: string, defaultValue: string) => {
        try {
            await fs.access(filePath);
        } catch (error) {
            await fs.writeFile(filePath, defaultValue, 'utf-8');
        }
    };

    await initializeFile(newsFilePath, '[]');
    await initializeFile(commentsFilePath, '[]');
}

initializeDataFiles();

const fileDb = {
    async init() {
        await initializeDataFiles();
    },

    async getNews(): Promise<News[]> {
        try {
            const newsContent = await fs.readFile(newsFilePath, 'utf-8');
            return JSON.parse(newsContent) as News[];
        } catch (error) {
            console.error('Error reading news file:', error);
            return [];
        }
    },

    async saveNews(news: News): Promise<News | undefined> {
        try {
            const { title, content, image } = news;

            if (!title || !content) {
                throw new Error('Title and content are required fields');
            }

            const newsId = crypto.randomUUID();
            const publicationDate = new Date().toISOString();
            const newsData: News = { id: newsId, title, content, image, publicationDate };

            const newsContent = await fs.readFile(newsFilePath, 'utf-8');
            const newsArray = JSON.parse(newsContent) as News[];
            newsArray.push(newsData);

            await fs.writeFile(newsFilePath, JSON.stringify(newsArray), 'utf-8');

            return newsData;
        } catch (error) {
            console.error('Error saving news:', (error as Error).message);
            return undefined;
        }
    },

    async getNewsById(id: string): Promise<News | undefined> {
        try {
            const newsContent = await fs.readFile(newsFilePath, 'utf-8');
            const newsArray = JSON.parse(newsContent) as News[];
            return newsArray.find((news) => news.id === id);
        } catch (error) {
            console.error('Error getting news by ID:', error);
            return undefined;
        }
    },

    async deleteNews(id: string): Promise<void> {
        try {
            const newsContent = await fs.readFile(newsFilePath, 'utf-8');
            let newsArray = JSON.parse(newsContent) as News[];

            newsArray = newsArray.filter((news) => news.id !== id);

            await fs.writeFile(newsFilePath, JSON.stringify(newsArray), 'utf-8');
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    },

    async getComments(newsId: string): Promise<Comment[]> {
        try {
            const commentsContent = await fs.readFile(commentsFilePath, 'utf-8');
            const commentsArray = JSON.parse(commentsContent) as Comment[];
            return commentsArray.filter((comment) => comment.newsId === newsId);
        } catch (error) {
            console.error('Error getting comments:', error);
            return [];
        }
    },

    async getCommentById(id: string): Promise<Comment | undefined> {
        try {
            const commentsContent = await fs.readFile(commentsFilePath, 'utf-8');
            const commentsArray = JSON.parse(commentsContent) as Comment[];
            return commentsArray.find((comment) => comment.id === id);
        } catch (error) {
            console.error('Error getting comment by ID:', error);
            return undefined;
        }
    },

    async saveComment(comment: Comment): Promise<Comment | undefined> {
        try {
            const { newsId, author, text } = comment;
            const commentId = crypto.randomUUID();
            const commentData: Comment = { id: commentId, newsId, author: author || 'Anonymous', text };

            const commentsContent = await fs.readFile(commentsFilePath, 'utf-8');
            const commentsArray = JSON.parse(commentsContent) as Comment[];
            commentsArray.push(commentData);

            await fs.writeFile(commentsFilePath, JSON.stringify(commentsArray), 'utf-8');

            return commentData;
        } catch (error) {
            console.error('Error saving comment:', error);
            return undefined;
        }
    },

    async deleteComment(id: string): Promise<void> {
        try {
            const commentsContent = await fs.readFile(commentsFilePath, 'utf-8');
            let commentsArray = JSON.parse(commentsContent) as Comment[];

            commentsArray = commentsArray.filter((comment) => comment.id !== id);

            await fs.writeFile(commentsFilePath, JSON.stringify(commentsArray), 'utf-8');
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    },
};

export default fileDb;
