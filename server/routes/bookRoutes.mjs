import express from 'express';
import { ErrorHandler } from '../utils/error.mjs';
import { addBook, deleteBook, getBooks, updateBook } from '../controllers/booksController.mjs';

const router = express.Router() 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return next(ErrorHandler(401, 'Access denied. No token provided.'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(ErrorHandler(403, 'Invalid token.'));
        }
        req.user = user; 
        next(); 
    });
};


router.post('/addBook', addBook)
router.get('/getBooks',getBooks)
router.put('/updateBook', updateBook)
router.delete('/deleteBook/:email', deleteBook);




export default router
