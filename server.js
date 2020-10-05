const express = require("express");
const bodyParser = require("body-parser"); 
const connectDB= require('./config/db')
connectDB();

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT||3000);