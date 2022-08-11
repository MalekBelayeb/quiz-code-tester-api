import router from "express"
import codingTestController from '../controllers/codingTest.controller.mjs';
import fileUpload from '../middlewares/fileUploader.mjs';
import runJSCode from '../middlewares/runJSCode.mjs';
import testJSCode from '../middlewares/testJSCode.mjs';
import resultTestInterpreter from '../middlewares/resultTestInterpreter.mjs';
import verifyToken from '../middlewares/verifyToken.mjs';

const app = router.Router();

app.post("/v1/coding-test",fileUpload,codingTestController.createCodingTest);
app.get("/v1/coding-test/:id"   ,codingTestController.getCodingTest);
app.post("/v1/coding-test/test",verifyToken,fileUpload,runJSCode,testJSCode,resultTestInterpreter,codingTestController.testCodingTest);

export default app;