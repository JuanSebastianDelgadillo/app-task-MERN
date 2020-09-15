const express = require('express');
const morgan = require('morgan');
const app = express();




//SETTING
app.set('port', process.env.PORT || 3100);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use(require('./routes/task.routes'));

//STATIC FILES




//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log(`Server Start on port : ${app.get('port')}`);
});