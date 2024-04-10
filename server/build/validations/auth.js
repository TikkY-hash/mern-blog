import Joi from 'joi';
export const registerValidation = [
    (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            }),
            password: Joi.string().min(5).pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$')).required().messages({
                'string.min': 'Password must contain at least 5 characters',
                'string.pattern.base': 'Password must contain at least one letter and one digit',
                'any.required': 'Password is required'
            }),
            fullName: Joi.string().min(3).required().messages({
                'string.min': 'Full name must be at least 3 characters long',
                'any.required': 'Full name is required'
            }),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
];
//# sourceMappingURL=auth.js.map