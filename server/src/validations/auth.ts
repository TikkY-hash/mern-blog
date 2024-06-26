import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

export const registerValidation = [
  (req: Request, res: Response, next: NextFunction) => {
    const schema: Schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
      }),
      password: Joi.string().min(5).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[a-zA-Z\\d@$!%*#?&]{5,}$')).required().messages({
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
