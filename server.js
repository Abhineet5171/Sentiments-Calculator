const express = require("express");
const bodyParser = require("body-parser"); 
const connectDB= require('./config/db')
const errorController = require('./controller/error')
connectDB();

const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', require('./controller/api/users'));

app.use(errorController.get404);


app.listen(process.env.PORT||3000);