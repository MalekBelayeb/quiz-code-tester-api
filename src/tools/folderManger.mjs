import path from "path"
import fs from "fs"
import {fileURLToPath} from 'url';

export default (folderName) => {

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

