import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NewList from './components/NewsList.tsx';
import NewPost from './components/NewPost.tsx';
import NewsDetails from './components/NewsDetails.tsx';
const App = () => {
    return (
        <>
            <CssBaseline />
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/news" element={<NewList />} />
                        <Route path="/news/new" element={<NewPost />} />
                        <Route path="/news/:id" element={<NewsDetails />} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;