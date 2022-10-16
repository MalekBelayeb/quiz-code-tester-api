const fs = require("fs");
const { v4: uuidv4  } = require('uuid');
const getFolder  = require ("./folder-manager.js");

fs.readFileAsync = (filename) => {

    return new Promise(function (resolve, reject) {
        fs.readFile(filename, "utf8", function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

fs.replaceInFile = (file, textToBeReplace, withText) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            
            var result = data.replace(textToBeReplace, withText);
            let filename =  "attempt_test"+ "_" + uuidv4() + ".test.js"
            let newFilePath = getFolder("js") + filename

            fs.writeFile(newFilePath, result, 'utf8', function (err) {
                if (err) {

                    reject()

                } else {

                    resolve(filename)

                }
            });
        });
    })
}


module.exports = fs;