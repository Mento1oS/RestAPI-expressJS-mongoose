const User = require('../models/user');
const Book = require('../models/book');
const helloWorld = (request, response)=>{
    response.status(200);
    response.send('Hello, Worldic');
}
const getUserById = async (request, response)=>{
    const {user_id} = request.params;
    try {
        await User.findById(user_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.findById(user_id).populate('books').then((data)=>{
        response.status(200).send(data);
    })
}
const getUsers = (request, response)=>{
    return User.find({}).populate('books').then((data)=>{
        response.status(200).send(data);
    });
}
const deleteUserById = async (request, response)=>{
    const {user_id} = request.params;
    try {
        await User.findById(user_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.findByIdAndDelete(user_id).then(()=>{
        response.status(200).send('success');
    });
}
const createUser = (request, response)=>{
    return User.create({...request.body}).then((user)=>{
        response.status(201).send(user);
    });
}
const patchUserById = async (request, response)=>{
    const {user_id} = request.params;
    try {
        await User.findById(user_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.findByIdAndUpdate(user_id, {...request.body}).then((user)=>{
        response.status(200).send(user);
    })
}
const getUserBooks = async (request, response)=>{
    const {user_id} = request.params;
    try {
        await User.findById(user_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.findById(user_id).populate('books').then(user=>{
        response.status(200).send(user.books);
    }) 
}
const addUserBook = async (request, response)=>{
    const {user_id} = request.params;
    try {
        await Book.findById(request.body._id);
        await User.findById(user_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.findById(user_id).then(async(data)=>{
        let bookArray = data.books;
        bookArray.push({...request.body});
        await User.findByIdAndUpdate(user_id, {books: bookArray}).populate('books').then((user)=>{
            response.status(201).send(user);
        });
    })
}
const deleteUserBook = async (request, response)=>{
    const {user_id, book_id} = request.params;
    try {
        await Book.findById(book_id);
        await User.findById(user_id);
    } catch (error) {
        return response.status(404).send('404 error');
    }
    return User.findById(user_id).then(async(user)=>{
        bookArray = user.books;
        const indexOfDeleted = bookArray.indexOf(book_id);
        bookArray.splice(indexOfDeleted, 1);
        if(indexOfDeleted>-1){
            await User.findByIdAndUpdate(user_id, {books:bookArray}).populate('books').then((user)=>{
                response.status(200).send(user);
            });
        }
        else{
            response.status(200).send('no data');
        }
    });
}
module.exports = {helloWorld, getUserById, createUser, getUsers, deleteUserById, patchUserById, getUserBooks, addUserBook, deleteUserBook};