import Auth from './pages/Auth';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Articles from './pages/Articles';
import EditorArticles from './pages/EditorArticles';
import EditorArticle from './pages/EditorArticle';
import Article from './pages/Article';
import PrivateRoutes from './components/PrivateRoutes';
import Toast from './components/Toast';

const App = () => (
  <>
    <Header />
    <Toast />
    <Container maxWidth="lg">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Articles />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/editor" element={<EditorArticles />} />
          <Route path="/editor/article/:id?" element={<EditorArticle />} />
        </Route>
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Container>
  </>
);

export default App;
