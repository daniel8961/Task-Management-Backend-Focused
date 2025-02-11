import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');

const SECRET_KEY = dotenv.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default authenticateUser;
