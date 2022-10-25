const CodingTest = require('../models/coding-test-model.js');
const CodingAttempt = require('../models/coding-attempt-model.js');
const getFolder = require ("../tools/folder-manager.js");
const fs = require('../tools/fs-prototypes.js');
const mongoose = require ('mongoose');


const createCodingTest = async (req, res) => {

    try {

        const codingTest = new CodingTest()
        codingTest.testDescription = req.body.descriptionCodingTest;
        codingTest.codeFile = req.body.programmingLanguage + "\\" + req.files?.codeFile[0].filename
        codingTest.testCasesFile = req.body.programmingLanguage + "\\" + req.files?.testCasesFile[0].filename
        codingTest.programmingLanguage = req.body.programmingLanguage

        //let newCodingTest = await codingTest.save();
        res.json({ message: "Coding test created.", newCodingTest:"" })

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

        var codingTest = await CodingTest.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: "codingattempts",
                    localField: "_id",
                    foreignField: "codingTest",
                    pipeline:[{$sort:{"createdAt":-1}},{$limit:1}],
                    as: "lastAttempts"
                }
            },
        ]).exec();
        
        if (!codingTest || codingTest.legnth < 0) return res.status(404).send({ message: "coding test no found" })
        codingTest = codingTest[0];
        result.description = codingTest.testDescription ?? ""
        result.codeText = await fs.readFileAsync("uploads/" + (codingTest.lastAttempts.length > 0 ? 'js/'+codingTest.lastAttempts[0].codingAttemptFile : codingTest.codeFile));

        res.send(result)
        
    } catch (err) {

        console.log(err)
        res.status(404).end()
        
    }
}

const testCodingTest = async (req, res) => {

    try {

        let idCodingTest = req.body.idTest
        let {idCandidate,attemptFileName,testAttemptFilePath,attemptResult} = req;

        let codingAttempt = new CodingAttempt()
        codingAttempt.candidate = idCandidate
        codingAttempt.codingTest = idCodingTest
        codingAttempt.codingAttemptFile = attemptFileName
        codingAttempt.codingTestCasesFile = testAttemptFilePath
        codingAttempt.testCases = attemptResult

        await codingAttempt.save();

        res.send({ message: attemptResult })

    } catch (err) {

        console.log(err)
        res.status(404).end()

    }


}


module.exports = { createCodingTest, getCodingTest, testCodingTest }



