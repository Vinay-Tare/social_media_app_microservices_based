import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
    const secretKey = process.env.JWT_SECRET_KEY || '123456789';

    const authToken = req.header('Authorization');
    if (!authToken) {
        return res.status(401).json({ message: 'Authorization denied' });
    }
    try {
        const decodedToken = jwt.verify(authToken, secretKey);
        req.user = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export { verifyUser };