const Book = require('../models/book');
const User = require('../models/user');
const errorHandler = require('./error');

const helloWorld = (request, response)=>{
    response.status(200);
    response.send('Hello, World');
}
const getBookById = async (request, response)=>{
    const {book_id} = request.params;
    try {
        await Book.findById(book_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return Book.findById(book_id).then((data)=>{
        response.status(200).send(data);
    })
}
const getBooks = (request, response)=>{
    return Book.find({}).then((data)=>{
        response.status(200).send(data);
    });
}
const deleteBookById = async (request, response)=>{
    const {book_id} = request.params;
    try {
        await Book.findById(book_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.find({books: {_id:[book_id]}}).then(async (data)=>{
        const ids = data.map(user=>user._id);
        for (let i = 0; i < ids.length; i++) {
            let booksArray = data[i].books;
            while(booksArray.includes(book_id)){
                const indexOfDeleted = booksArray.indexOf(book_id);
                booksArray.splice(indexOfDeleted,1);
                await User.findByIdAndUpdate(ids[i], {books:booksArray})
            }
        }
        Book.findByIdAndDelete(book_id).then(()=>{
            response.status(200).send('success');
        });
    }); 
}
const createBook = (request, response)=>{
    return Book.create({...request.body}).then((book)=>{
        response.status(201).send(book);
    });
}
const patchBookById = async (request, response)=>{
    const {book_id} = request.params;
    try {
        await Book.findById(book_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return Book.findByIdAndUpdate(book_id, {...request.body}).then((data)=>{
        response.status(200).send(data);
    })
}
module.exports = {helloWorld, getBookById, createBook, getBooks, deleteBookById, patchBookById};