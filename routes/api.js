const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const passwordHash = require("password-hash");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat'
});

router.get('/message/:id', function (req, res) {
    connection.query('SELECT * FROM message WHERE id = ?', req.params.id, function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

router.get('/messages/', function (req, res) {
    connection.query('SELECT * FROM message', function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

router.get('/users/', function (req, res) {
    connection.query('SELECT id, login, image FROM user', function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

router.post('/message', function (req, res) {
    connection.query("INSERT INTO  message SET sender_id = ?, text_message = ?, sended_at = ?",
        [1, req.body.text_message, new Date().toISOString().slice(0, 19).replace('T', ' ')],
        function (err, results) {
            if (err) throw err;
            return res.send({error: false, data: results, message: 'New message has been created successfully.'});
        });
});

router.post('/user', function (req, res) {
    let registration = {
        login: req.body.login,
        password_hash: passwordHash.generate(req.body.password),
        image: req.body.image
    };

    connection.query('INSERT INTO user SET ?', registration,
        function (err, result) {
            if (err) throw err;
            console.log('user added to database with id: ' + result.insertId);
        }
    );
    res.sendStatus(200);
});


module.exports = router;