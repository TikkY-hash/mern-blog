import express from 'express';
import {
  createArticle,
  getArticles,
  getArticle,
  deleteArticle,
  updateArticle,
  getMyArticles,
} from '../controllers/ArticleController.js';
import checkAuth from '../utils/checkAuth.js';
import { createArticleValidation } from '../validations/articles.js';

const router = express.Router();

router.get('/', getArticles);

router.get('/my', checkAuth , getMyArticles);

router.post('/', checkAuth, createArticleValidation, createArticle);

router.delete('/:id', checkAuth, deleteArticle);

router.patch('/:id', checkAuth, updateArticle);

router.get('/:id', getArticle);

export default router;
