import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/User.js';
import { Response, Request } from 'express';

export const loginController = async (req: Request, res: Response) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).json({ error: 'Incorrect login or password' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(404).json({ error: 'Incorrect login or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as Secret, {
      expiresIn: '30d',
    });
    

    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as Secret, {
      expiresIn: '30d',
    });
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
};

