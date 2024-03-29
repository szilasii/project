var express = require('express');
const cors = require('cors');
var app = express();
global.__basedir = __dirname;
app.use(cors({origin: '*'}));

app.use(express.json());
app.use(require('../router/router'))
app.use('/api', require("../addr/router"));
app.use('/api',require("../user/router"));
app.use('/api',require("../login/router"));
app.use('/api',require("../upload/router"));
app.use('/api',require("../upload2/router"));

module.exports = app