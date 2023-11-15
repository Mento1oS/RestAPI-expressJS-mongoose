const bookRouter = require('express').Router();

const {helloWorld, getBookById, getBooks, deleteBookById, createBook, patchBookById} = require('../controllers/books');
const { errorHandler } = require('../controllers/error');

bookRouter.get('/', helloWorld);

bookRouter.get('/books/:book_id', getBookById);

bookRouter.get('/books/:*', errorHandler);

bookRouter.get('/books', getBooks);

bookRouter.post('/books', createBook);

bookRouter.delete('/books/:book_id', deleteBookById);

bookRouter.patch('/books/:book_id', patchBookById);

module.exports={bookRouter};
