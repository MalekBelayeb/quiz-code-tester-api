import CodingQuiz from '../models/codingQuiz.model.mjs';

const createCodingQuiz = async (req,res) => {

    try 
    {
        
        const codingQuiz = new CodingQuiz()
        codingQuiz.testDescription = req.body.testDescription
        codingQuiz.numberOfRandomTests = req.body.numberOfRandomTests
        
        await codingQuiz.save();
        res.status(200).json({message: "Coding quiz created."})

    }catch(err)
    {

        console.log(err)
        res.status(404).json({message: "coding quiz creation failed"})
        
    }

}


export default {createCodingQuiz};