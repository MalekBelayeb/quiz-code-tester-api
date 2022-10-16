const multer = require("multer");
const path = require("path");
const { v4: uuidv4  } = require('uuid');
const getFolder = require("../tools/folder-manager.js");

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

module.exports = multer({ storage: storage, limits: { fileSize: 5000000 /* 5MB */ } }).fields([

  { name: 'codeFile', maxCount: 1 },
  { name: 'testCasesFile', maxCount: 1 },
  { name: 'attempt', maxCount: 1 },
  
]);


