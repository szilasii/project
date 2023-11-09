var express = require('express');



var app = express();

app.use('/address/:id', require("../addr/router"));

module.exports = app