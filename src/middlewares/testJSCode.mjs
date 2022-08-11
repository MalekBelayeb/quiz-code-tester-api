import { run } from '../tools/commandRunner.mjs'
import getFolder from "../tools/folderManger.mjs";
import CodingTest from '../models/codingTest.model.mjs';
import fs from '../tools/fsPrototypes.mjs'

export default async (req, res, next) => {

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