import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const loginController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'Incorrect login or password' });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);
        if (!isValidPassword) {
            return res.status(404).json({ error: 'Incorrect login or password' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: '30d',
        });
        res.json(token);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};
export const registerController = async (req, res) => {
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
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: '30d',
        });
        res.json(token);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
};
export const meController = async (req, res) => {
    try {
        const user = await User.findById(req.userId).lean();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { passwordHash, ...userData } = user;
        res.json(userData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Invalid access' });
    }
};
//# sourceMappingURL=UserController.js.map