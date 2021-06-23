const {Client} = require('pg')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const client = new Client({
    host: "localhost",
    user: "gyozo",
    port: 5432,
    password: "sanyi",
    database: "ApiWars"

})

client.connect();







function hash(username, pw) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pw, salt, function (err, hash) {
            userDataInsert (username, hash)
        });
    });
}

// client.query(`SELECT * FROM users`, (err, res) =>{
//     if(!err){
//        return console.log(res.rows)
//     }
//     else {
//         console.log(err.message);
//     }
//     client.end;
//     })
//


function userDataInsert (n, p){
    console.log(n)
    console.log(p)
    client.query(
  `INSERT INTO users(name, pw) VALUES ('${n}', '${p}')`
);
}

// hash()
userDataInsert("f", "valami")
