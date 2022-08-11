import router from "express"
import candidateController from '../controllers/candidate.controller.mjs';

const app = router.Router();

app.post("/v1/register/candidate",candidateController.signUpCandidate);
app.post("/v1/login/candidate",candidateController.signInCandidate);

export default app;