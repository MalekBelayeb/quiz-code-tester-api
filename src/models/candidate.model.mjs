import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({

    email: {type:String,required:[true,"Missing email field"]},
    password :{type:String,required:[true,'Missing password field']},
    
});

export default mongoose.model('Candidate', CandidateSchema);