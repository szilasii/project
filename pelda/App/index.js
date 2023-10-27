var express = require('express');
var app = express();
const cors = require('cors');
const mysql = require('mysql2');
const Config  = require('../config');


//Betölti a CORS támogatást 
app.use(cors({origin: '*'}));

//lehetővé teszi a POST kérések elküldött adatainak (body) elérését
app.use(express.json());

module.exports = app