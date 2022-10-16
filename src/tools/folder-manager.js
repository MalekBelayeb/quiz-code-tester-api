const path = require("path");
const fs = require("fs");


module.exports = (folderName) => {

    let serverRootPath = path.join(__dirname, '../../')
    let imageUploadsPath = serverRootPath + '/uploads/' + folderName + "/"

    if (!fs.existsSync(imageUploadsPath)) {

        fs.mkdirSync(imageUploadsPath, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        })

    }

    return imageUploadsPath

}

