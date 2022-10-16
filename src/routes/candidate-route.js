const router = require("express");
const candidateController = require('../controllers/candidate-controller');

const app = router.Router();

app.post("/v1/register/candidate",candidateController.signUpCandidate);
app.post("/v1/login/candidate",candidateController.signInCandidate);

module.exports = app;