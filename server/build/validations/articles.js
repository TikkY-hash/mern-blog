import Joi from 'joi';
export const createArticleValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'any.required': 'Title is required',
        }),
        description: Joi.string().required().messages({
            'any.required': 'Description is required',
        }),
        image: Joi.string().uri().required().messages({
            'string.uri': 'Image must be a valid URL',
            'any.required': 'Image is required',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
//# sourceMappingURL=articles.js.map