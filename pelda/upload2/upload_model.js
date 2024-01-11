var formidable = require('formidable');
var fs = require('fs');

const upload = async (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.file[0].filepath;
    var newpath = __basedir + '/uploads/' + files.file[0].originalFilename;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/uploads/";
  
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url:  "http://localhost:8000/api/files/" + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };
  
  const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };

  module.exports = {
    upload,
    getListFiles,
    download,
  };