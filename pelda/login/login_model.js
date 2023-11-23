const mysql = require("mysql2");
const config = require("../App/config");
 function signin(req,res) {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("Töltsd ki az összes adatot!");
        }
        var con = mysql.createConnection(config.database);
        con.connect(function(err) {
            if (err) throw err; 
            console.log('sikeres csatlakozás');
        })
        const sql = 'call userLogin(?,?)';
        
        con.query(sql,[email,password], (err,result) =>{
            if (err) throw err;
            if (result[0].length > 0){
                res.send(result[0][0]);
            }
            else{
                res.status(401).send("nem engedélyezett");
            }
            
        })


    } catch (error) {

    }
}

exports.signin = signin