const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "training"
});

// ------------------------------------------ //

app.post("/addWord", (req, res) => {
    db.query(`INSERT INTO words (EN, BG) VALUES ("${req.body.EN}","${req.body.BG}")`);
    res.send({});
});

app.post("/deleteWord", (req, res) => {
    db.query(`DELETE FROM words WHERE id = ${req.body.id}`);
    res.send({});
});

app.get("/getWords", (req, res)=>{
    db.query(`SELECT * FROM words`, (error, results) =>{
        res.send(results);
    });
});

app.get("/roll", (req, res) => {
    db.query(`SELECT * FROM words ORDER BY rand() LIMIT 1`,(error, results) =>{
        res.send(results[0]);
    });
});

app.post("/compare", (req, res) =>{
    db.query(`SELECT * FROM words WHERE EN = "${req.body.EN}" AND BG = "${req.body.BG}"`,(error, results) =>{
        res.send(results);
    });
});

// ------------------------------------------ //
app.listen(port, () => {
    console.log(`Server is running. Port: ${port}`);
});