const errorRouter = require('express').Router();
const {errorHandler} = require('../controllers/error')

errorRouter.get('*', errorHandler);

module.exports={errorRouter};