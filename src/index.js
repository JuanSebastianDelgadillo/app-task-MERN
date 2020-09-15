const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');
const path = require('path');
const app = express();

//SETTING
app.set('port', process.env.PORT || 3100);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
// /api/tasks
app.use('/api/tasks', require('./routes/task.routes'));

//STATIC FILES
// console.log(__dirname);
// console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log(`Server Start on port : ${app.get('port')}`);
});