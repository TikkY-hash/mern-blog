import jwt from 'jsonwebtoken';
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/^Bearer\s*/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            if (decoded && typeof decoded === 'object' && '_id' in decoded) {
                req.userId = decoded._id;
                return next();
            }
            else {
                throw new Error('Invalid token payload');
            }
        }
        catch (error) {
            return res.status(403).json({
                message: 'Invalid token',
            });
        }
    }
    else {
        return res.status(403).json({
            message: 'Invalid token',
        });
    }
};
//# sourceMappingURL=checkAuth.js.map