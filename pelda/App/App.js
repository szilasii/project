
const cors = require('cors');
const config  = require('./config');
const app = require('./index');
const port = 8000;
//Betölti a CORS támogatást 
app.use(cors({origin: '*'}));

//lehetővé teszi a POST kérések elküldött adatainak (body) elérését



// ez a végpont mutatja, hogy fut a node js szerver
app.get('/',(req,res) => {
    res.send("<h1>Szerver fut</h1>")
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

