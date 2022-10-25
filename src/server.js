const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const codingTestRoute = require('./routes/coding-test-route');
const candidateRoute = require('./routes/candidate-route');


const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/api', codingTestRoute);
app.use('/api', candidateRoute);



// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(process.env.PORT, () => {

  console.log(`server started at http://localhost:${process.env.PORT}`);
    //const child = run("dir -l")

});
require("./config/database").connect();


app.get("/welcome", (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
  

module.exports = app;
