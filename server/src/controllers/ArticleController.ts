import Article from '../models/Article.js';
import { Request, Response } from 'express';
import { AuthRequest } from '../types/controllerTypes.js';

export const createArticle = async (req: AuthRequest, res: Response) => {
  try {
    const doc = new Article({
      user: req.userId,
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
    });

    const article = await doc.save();

    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    let query = {};

    if (req.query.search) {
      query = { title: { $regex: req.query.search, $options: 'i' } };
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const sortField = (req.query.sortField as string) || 'createdAt';
    const sortOrder = (req.query.sortOrder as string) || 'desc';

    const startIndex = (page - 1) * limit;
    let skipCount = 0;

    if (sortOrder === 'desc') {
      skipCount = startIndex;
    } else {
      const totalDocuments = await Article.countDocuments({});
      const sortedSkip = totalDocuments - startIndex - limit;
      skipCount = Math.max(0, sortedSkip);
    }

    const sortCriteria: any = {};
    sortCriteria[sortField] = sortOrder;

    const articles = await Article.find(query).sort(sortCriteria).skip(skipCount).limit(limit).populate('user').exec();

    const totalArticles = await Article.countDocuments(query);

    const response = {
      articles,
      currentPage: page,
      totalPages: Math.ceil(totalArticles / limit),
      totalArticles,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get articles' });
  }
};

export const getMyArticles = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const query : any = { user: userId };
    
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const correctPage = (page - 1) * limit;

    const articles = await Article.find(query).skip(correctPage).limit(limit).populate('user').exec();

    const totalArticles = await Article.countDocuments(query);

    const response = {
      articles,
      currentPage: page,
      totalPages: Math.ceil(totalArticles / limit),
      totalArticles,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user articles' });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const isViewRequest = req.query.view === 'true';

    if (isViewRequest) {
      await Article.findByIdAndUpdate(articleId, { $inc: { viewsCount: 1 } });
    }

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get article' });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await article.deleteOne();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cannot delete article' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;

    Article.updateOne(
      {
        _id: articleId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      },
    ).exec();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get articles' });
  }
};
