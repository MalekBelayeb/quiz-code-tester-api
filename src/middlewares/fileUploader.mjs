
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import getFolder from "../tools/folderManger.mjs";

var storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, getFolder("js"));

  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + uuidv4() + path.extname(file.originalname),
    );
  },

  fileFilter: (req, file, cb) => {

    const filetypes = /js|ts|java/;
    cb(null, filetypes.test(path.extname(file.originalname).toLowerCase()));

  },

});

export default multer({ storage: storage, limits: { fileSize: 5000000 /* 5MB */ } }).fields([

  { name: 'codeFile', maxCount: 1 },
  { name: 'testCasesFile', maxCount: 1 },
  { name: 'attempt', maxCount: 1 },
  
]);


