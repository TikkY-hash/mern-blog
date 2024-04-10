import express from 'express';
import { createArticle, getArticles, getOneArticle, deleteArticle, updateArticle } from '../controllers/ArticleController.js';
import checkAuth from '../utils/checkAuth.js';
import { createArticleValidation } from '../validations/articles.js';
const router = express.Router();
router.get('/', checkAuth, getArticles);
router.post('/', checkAuth, createArticleValidation, createArticle);
router.delete('/:id', checkAuth, deleteArticle);
router.patch('/:id', checkAuth, updateArticle);
router.get('/:id', checkAuth, getOneArticle);
export default router;
//# sourceMappingURL=articleRoutes.js.map