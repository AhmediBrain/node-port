const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const teamsRoutes = require('./routes/teamsRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
    return res.json('From Backend !!!');
});

app.use('/users', userRoutes);
app.use('/teams', teamsRoutes);
app.use('/nets-team', teamsRoutes);
console.log('Teams:', teamsRoutes);

module.exports = app;