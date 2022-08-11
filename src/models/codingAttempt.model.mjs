import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CodingAttemptSchema = new Schema({

    codingTest: { type: Schema.Types.ObjectId, ref: 'CodingTest' },
    candidate : { type: Schema.Types.ObjectId, ref: 'Candidate' },
    codingAttemptFile:{type:String,required:true},
    codingTestCasesFile:{type:String,required:true},
    testCases:{type:Object}
    
},{
    versionKey:'attemptNum',
    timestamps: true

});

export default mongoose.model('CodingAttempt', CodingAttemptSchema);