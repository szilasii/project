var upload_model = require('./upload_model');
var router = require('express').Router();
const auth = require("../auth/auth");

router.post("/upload2",auth, upload_model.upload);
router.get("/files2", upload_model.getListFiles);
router.get("/files2/:name", upload_model.download);


module.exports = router