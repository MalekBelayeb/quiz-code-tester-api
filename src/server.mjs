import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser"
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import codingTestRoute from './routes/codingTest.route.mjs';
import candidateRoute from './routes/candidate.route.mjs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

export default app;
