const  run  = require('../tools/command-runner.js')
const getFolder = require("../tools/folder-manager.js");
const CodingTest = require ('../models/coding-test-model.js');
const fs = require('../tools/fs-prototypes.js');

module.exports = async (req, res, next) => {

    try {

        let attemptFilePath = req.attemptFilePath
        let idTest = req.body.idTest

        let codingTest = await CodingTest.findById(idTest)
        if (codingTest) {
            let unitTestsFile = await fs.replaceInFile("uploads/" + codingTest.testCasesFile.replace("\\", "/"), "${attempt_path}", attemptFilePath.replace(/\\/g, '/'))
            let command_to_run = "cd " + getFolder("js") + " && npm test " + unitTestsFile
            let child = run(command_to_run)
            
            let result = []

            child.stderr.on('data', data => {

                let message = data.toString()
                result.push(message.split(/\n/))

            });

            child.on('close', (code) => {
                req.testResult = result
                req.testAttemptFilePath = unitTestsFile
                next()
                console.log(`child process exited with code ${code}`);
            });

        } else {

            res.status(404).send({ message: "Coding test not found" })

        }

    } catch (err) {

        console.log(err)
        res.status(404).end()

    }

}