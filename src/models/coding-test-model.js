const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodingTestSchema = new Schema({

    testDescription: {type:String,required:[true,"Missing test description field"]},
    programmingLanguage:{type:String,required:[true,"Missing programming language field"],enum:["js","java","ts"]},
    codeFile:{type:String,required:[true,"Missing code file"]},
    testCasesFile:{type:String,required:[true,"Missing test cases file"]},
    isArchived:{type:Boolean,default:false},
    difficulty:{type:Number,default:1}
    
});

module.exports = mongoose.model('CodingTest', CodingTestSchema);
