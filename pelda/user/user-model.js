const mysql = require("mysql2");
const config = require("../App/config");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

// ez a függvény visszaadja az összes felhasználó adatát
 function getAllUserInfos(req,res) {
    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('select * from User', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
}

function getUserDataFromId(req,res) {
    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('CALL getAllUserInfos(?) ',[req.params['id']], (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
}


// Ez a függvény regisztrál egy új felhasználót és lementi az adatbázisba
async function regUser (req,res)  {



    const { name, email, password, accountNumber} = req.body;

    console.log(name, email, password, accountNumber);

    if (!(name && email && password && accountNumber)) {
        res.status(400).send("Töltsd ki az adatatokat rendesen!");
    }

    if (!validator.validate(email))  {
        res.status(400).send("Nem megfelelő formátumú email!");        
    }

    //ecryptedPw = await bcrypt.hash(password,10);    

    const token = jwt.sign(
            {
                userid: email, name 
            },
            config.TokenKey,
            {
                expiresIn:"2h",
            });    

    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    const sql = 'insert into User (name,email,password,accountNumber,token) values ("' +req.body.name + '","'+ req.body.email+'","'+ req.body.password+'","'+ req.body.accountNumber+'")';
    const sql2 = 'insert into User (name,email,password,accountNumber,token) values (?,?,?,?,?)';
    
    console.log(sql);
    con.query(sql2,[req.body.name,req.body.email,req.body.password,req.body.accountNumber,token], (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
    
}

function createNewAddress (req,res) {
    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err; 
        console.log('sikeres csatlakozás');
    })
    const sql = 'insert into Address (zipCode,city,street,userID) values (?,?,?,?)';
    
    console.log(sql);
    con.query(sql,[req.body.zipCode,req.body.city,req.body.street,req.params["id"]], (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
}


exports.createNewAddress = createNewAddress
exports.getAllUserInfos = getAllUserInfos
exports.getUserDataFromId = getUserDataFromId
exports.regUser = regUser
