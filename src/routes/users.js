const userRouter = require('express').Router();

const {helloWorld, getUserById, createUser, getUsers, deleteUserById, patchUserById, getUserBooks, addUserBook, deleteUserBook} = require('../controllers/users')

userRouter.get('/', helloWorld);

userRouter.get('/users/:user_id', getUserById);

userRouter.get('/users', getUsers);

userRouter.post('/users', createUser);

userRouter.delete('/users/:user_id', deleteUserById);

userRouter.patch('/users/:user_id', patchUserById);

userRouter.get('/users/:user_id/books', getUserBooks);

userRouter.post('/users/:user_id/books', addUserBook);

userRouter.delete('/users/:user_id/books/:book_id', deleteUserBook);

module.exports={userRouter};
