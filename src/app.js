const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const mongoose = require('mongoose');
const {userRouter} = require('./routes/users');
const {bookRouter} = require('./routes/books');
const {originalUrlLogger} = require('./middlewares/originalUrlLogger');
const { errorRouter } = require('./routes/error');
dotenv.config();

const { PORT, API_URL, MONGO_URL} = process.env;

mongoose.connect(MONGO_URL)
  .then(()=>{console.log('connected to mndb');}).
  catch(error => console.log(error));

const app = express();

app.use(cors());

app.use(originalUrlLogger);

app.use(bodyParser.json());

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).send(err.stack);
})
app.use(bookRouter);
app.use(userRouter);
app.use(errorRouter);

app.listen(PORT, ()=>{
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
})