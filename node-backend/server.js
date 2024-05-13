const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    port: '3309',
    user: 'root',
    password: '',
    database: 'node_sample'
})

app.get('/', (req, res) => {
    return res.json('From Backend !!!');
});

app.get('/users', (req, res) => {
    const sqlQuery = "SELECT * FROM users";
    db.query(sqlQuery, (error, data) => {
        if(error) return res.json(error);
        return res.json(data);
    })
})

app.listen(8030, () => {
    console.log('Server is listening.')
});
