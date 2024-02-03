import express from 'express';
import fileDb from './fileDb';
import cors from 'cors';
import newsRouter from "./routes/newsRouter";
import commentsRouter from "./routes/commentsRouter";

const app = express();
const port = 8000;

app.use(express.json());

app.use(cors());

app.use(express.static('public'));

app.use('/comments', commentsRouter);
app.use('/news', newsRouter);



const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run();

