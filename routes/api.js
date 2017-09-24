const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat'
});

router.get('/message/:id', function (req, res) {
    connection.query('SELECT * FROM message WHERE id = ?', req.params.id, function (err, rows) {
        if (err) throw err;
        console.log('get task, id: ' + req.params.id);
        res.status(200).send(rows);
    });
});

router.get('/messages/', function (req, res) {
    connection.query('SELECT * FROM message', function (err, rows) {
        if (err) throw err;
        console.log('get task');
        res.status(200).send(rows);
    });
});
router.get('/users/', function (req, res) {
    connection.query('SELECT id, login, image FROM user',  function (err, rows) {
        if (err) throw err;
        console.log('get user');
        res.status(200).send(rows);
    });
});

router.route('/message')
    .post(function (req, res) {
        connection.query("INSERT INTO  message SET sender_id = ?, text_message = ?, sended_at = ?",
            [1, req.body.text_message, new Date().toISOString().slice(0, 19).replace('T', ' ')],
            function (err, results) {
                if (err) throw err;
                return res.send({error: false, data: results, message: 'New message has been created successfully.'});
            });
    });


module.exports = router;