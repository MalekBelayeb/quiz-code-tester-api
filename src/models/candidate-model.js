const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({

    email: {type:String,required:[true,"Missing email field"]},
    password :{type:String,required:[true,'Missing password field']},
    
});

module.exports = mongoose.model('Candidate', CandidateSchema);