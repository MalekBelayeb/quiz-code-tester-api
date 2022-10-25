const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const codingTestRoute = require('./routes/coding-test-route');
const candidateRoute = require('./routes/candidate-route');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/api', codingTestRoute);
app.use('/api', candidateRoute);



app.listen(process.env.PORT, () => {

    console.log(`server started at http://localhost:${process.env.PORT}`);
    //const child = run("dir -l")

});
require("./config/database").connect();


app.get("/welcome", (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
  

module.exports = app;
