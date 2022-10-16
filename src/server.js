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

mongoose.connect(
    process.env.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to the database');
        }
    },
);

app.listen(process.env.PORT, () => {

    console.log(`server started at http://localhost:${process.env.PORT}`);
    //const child = run("dir -l")

});

module.exports = app;
