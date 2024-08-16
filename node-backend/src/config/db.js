// src/config/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3309',
    user: 'root',
    password: '',
    database: 'node_sample'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;
