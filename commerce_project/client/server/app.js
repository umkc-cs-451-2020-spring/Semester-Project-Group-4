const express = require('express');
const mysql = require('mysql');
const app = express();

const port = 3306;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'commerce',
    debug: true,
    timeout: 2000,
    connectTimeout: 2000
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // uncomment for mac and linux
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.message);
        return;
    }
    connection.query("CREATE DATABASE commerce", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    console.log("Connected to MySQL server.");
});


app.get('/', function (req, res) {
    res.send("Server Up and Running!");
});

app.listen(port, () => console.log('http://localhost:3306'));
