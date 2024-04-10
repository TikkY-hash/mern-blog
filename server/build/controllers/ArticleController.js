import Article from '../models/Article.js';
export const createArticle = async (req, res) => {
    try {
        const doc = new Article({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            user: req.userId,
        });
        const article = await doc.save();
        res.json(article);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create article' });
    }
};
export const getArticles = async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            query = { title: { $regex: req.query.search, $options: 'i' } };
        }
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const sortField = req.query.sortField || 'createdAt';
        const sortOrder = req.query.sortOrder || 'desc';
        const startIndex = (page - 1) * limit;
        const sortCriteria = {};
        sortCriteria[sortField] = sortOrder === 'asc' ? 'asc' : 'desc';
        const articles = await Article.find(query).populate('user').limit(limit).skip(startIndex).sort(sortCriteria).exec();
        const totalArticles = await Article.countDocuments(query);
        const response = {
            articles,
            currentPage: page,
            totalPages: Math.ceil(totalArticles / limit),
            totalArticles,
        };
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get articles' });
    }
};
export const getOneArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const updatedArticle = await Article.findOneAndUpdate({ _id: articleId }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after', new: true });
        if (!updatedArticle) {
            return res.status(404).json({ error: "Article didn't find" });
        }
        res.json(updatedArticle);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get article' });
    }
};
export const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ error: "Article didn't find" });
        }
        await article.deleteOne();
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Cannot delete article' });
    }
};
export const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        Article.updateOne({
            _id: articleId,
        }, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        });
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get articles' });
    }
};
//# sourceMappingURL=ArticleController.js.map