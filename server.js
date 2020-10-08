const express = require("express");
const bodyParser = require("body-parser"); 
var cookieParser = require('cookie-parser')
const path = require('path');

const connectDB= require('./config/db')
const errorController = require('./controller/error')
connectDB();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./routes/home'));
app.use('/vote',require('./routes/vote'));

app.use('/api/user', require('./controller/api/users'));

app.use('/api/auth', require('./controller/api/auth'));

app.use('/api/stats',require('./controller/api/stats'));

app.use('/api/vote', require('./controller/api/voting'));
app.use(errorController.get404);


app.listen(process.env.PORT||3000,()=>{
    console.log('listening at port 3000')
});