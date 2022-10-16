const router = require("express")
const codingTestController = require('../controllers/coding-test-controller');
const fileUpload = require('../middlewares/file-uploader');
const runJSCode = require('../middlewares/js-code-executer');
const testJSCode = require('../middlewares/js-code-tester');
const resultTestInterpreter = require('../middlewares/js-code-interpreter');
const verifyToken = require('../middlewares/verify-token');

const app = router.Router();

app.post("/v1/coding-test",fileUpload,codingTestController.createCodingTest);
app.get("/v1/coding-test/:id"   ,codingTestController.getCodingTest);
app.post("/v1/coding-test/test",verifyToken,fileUpload,runJSCode,testJSCode,resultTestInterpreter,codingTestController.testCodingTest);

module.exports = app;