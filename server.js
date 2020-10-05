const express = require("express");
const bodyParser = require("body-parser"); 
const connectDB= require('./config/db')
const errorController = require('./controller/error')
connectDB();

const app = express();


app.use(express.json({extended: false}));

// app.use(bodyParser.urlencoded({ extended: false }));


//user creation
app.use('/api/user', require('./controller/api/users'));

app.use('/api/auth', require('./controller/api/auth'));

app.use('/api/stats',require('./controller/api/stats'));
app.use(errorController.get404);


app.listen(process.env.PORT||3000);