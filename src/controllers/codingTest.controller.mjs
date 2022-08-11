import CodingTest from '../models/codingTest.model.mjs';
import CodingAttempt from '../models/codingAttempt.model.mjs';
import getFolder from "../tools/folderManger.mjs";
import fs from '../tools/fsPrototypes.mjs'

const createCodingTest = async (req, res) => {

    try {

        const codingTest = new CodingTest()
        codingTest.testDescription = req.body.testDescription;
        codingTest.codeFile = req.body.programmingLanguage + "\\" + req.files?.codeFile[0].filename
        codingTest.testCasesFile = req.body.programmingLanguage + "\\" + req.files?.testCasesFile[0].filename
        codingTest.programmingLanguage = req.body.programmingLanguage

        let newCodingTest = await codingTest.save();
        res.json({ message: "Coding test created.", newCodingTest })

    } catch (err) {

        if (err) {

            if (err.name === 'ValidationError') {
                console.log(err)
                res.status(404).json({ message: Object.values(err.errors).map(val => val.message) })
            }

        } else {

            console.log(err)
            res.status(404).end()
        }

    }

}

const getCodingTest = async (req, res) => {

    try {

        let result = {}
        let codingTest = await CodingTest.findById(req.params.id)
        result.description = codingTest.testDescription ?? ""
        result.codeText = await fs.readFileAsync("uploads/" + codingTest.codeFile)

        res.send(result)

    } catch (err) {

        console.log(err)
        res.status(404).end()
    }


}

const testCodingTest = async (req, res) => {

    try {

        let idCodingTest = req.body.idTest
        let idCandidate = req.iduser
        let attemptFileName = req.attemptFileName
        let testAttemptFilePath = req.testAttemptFilePath
        let attemptResultObj = req.attemptResult

        let existCodingAttempt = await CodingAttempt.findOne({ candidate: idCandidate, codingTest: idCodingTest })

        if (existCodingAttempt) {
            
            //Deleting old attempt & unit test files asynchronously 
            fs.unlink(getFolder("js") + "/" + existCodingAttempt.codingAttemptFile,(err) => {})
            fs.unlink(getFolder("js") + "/" + existCodingAttempt.codingTestCasesFile,(err) => {})
            existCodingAttempt.codingAttemptFile = attemptFileName
            existCodingAttempt.codingTestCasesFile = testAttemptFilePath
            existCodingAttempt.testCases = attemptResultObj
            existCodingAttempt.attemptNum++

            await existCodingAttempt.save();
        } else {

            let codingAttempt = new CodingAttempt()
            codingAttempt.candidate = idCandidate
            codingAttempt.codingTest = idCodingTest
            codingAttempt.codingAttemptFile = attemptFileName
            codingAttempt.codingTestCasesFile = testAttemptFilePath
            codingAttempt.testCases = attemptResultObj

            await codingAttempt.save();

        }


        res.send({ message: attemptResultObj })


    } catch (err) {

        console.log(err)
        res.status(404).end()

    }


}


export default { createCodingTest, getCodingTest, testCodingTest }



