const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Config  = require('../config');
const app = express();
const port = 8000;
//Betölti a CORS támogatást 
app.use(cors({origin: '*'}));

//lehetővé teszi a POST kérések elküldött adatainak (body) elérését
app.use(express.json());


// ez a végpont mutatja, hogy fut a node js szerver
app.get('/',(req,res) => {
    res.send("<h1>Szerver fut</h1>")
})

// ez a végpont visszaadja az összes felhasználó adatát
app.get('/user',(req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('select * from User', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
})

// Ez a végpont regisztrál egy új felhasználót és lementi az adatbázisba
app.post('/user', (req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    
    const userSQL = 'insert into User (name,email,password,accountNumber) values (?,?,?,?)'; 
    con.query(userSQL,[req.body.name,req.body.email,req.body.password,req.body.accountNumber], (err,result) => {
        if (err) { 
            console.log(err)
                res.status(404).send({status: 404 , error: "Hiba a user rögzítésekor"});
        }   else {
            res.status(200).send({status:200,success:"Sikeres adatrögzítés"})
        }
    }) 
   
     
})

app.get('/user/:id', (req,res) => {
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('CALL getAllUserInfos(?)',[req.params['id']], (err,result) =>{
        if (err) throw err;
            console.log("Result:", result[0])
            resultData = result[0];
            if (resultData.length > 0) {
                data = {name: "",
                email: "",

                accountNumber:"",
                address: []

            } ;
                data.name = resultData[0].name;
                data.email = resultData[0].email;
                data.accountNumber = resultData[0].accountNumber;
                resultData.forEach(row => {
                data.address.push({zipCode: row.zipCode,city: row.city,street:row.street,delivery:row.delivery}) 
                });
        }
        console.log(data)    
        res.send(data);
    })  
    
     
})

app.post('/address/:id', (req,res) => {


    if (!req.params['id']) {
        res.status(404).send({status: 404 , error: "Nem adaott meg user id-t"});
    }
   
    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
   
    const sql = 'insert into Address (zipCode,city,street,userID) values (?,?,?,?)';

    con.query(sql,[req.body.zipCode,req.body.city,req.body.street,req.params['id']], (err,result) =>{
        if (err) 
            if (err) res.status(404).send({status: 404 , error: "Hiba a cím rögzítésekor"});
        
        res.status(200).send({status:200, success:"success"});
    }) 
})

app.get('/proc',(req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('call allUserCount(@count)', (err,result) =>{
        if (err) throw err;
        con.query('select @count;', (err,result) =>{
            if (err) throw err;
            res.send(result);
        })   
    })   
})

app.get('/proci',(req,res) => {

    var con = mysql.createConnection(new Config());
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('select @count;', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
})




// publikáljuk a szervert
app.listen(port, () => {
console.log(`Példa alkalmazás publikálva ${port}-on`);

})

