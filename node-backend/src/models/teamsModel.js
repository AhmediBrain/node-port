const db = require('../config/db');

const getAllTeams = (callback) => {
    const sqlQuery = "SELECT * FROM teams";
    db.query(sqlQuery, callback);
}

const getAllNets = (callback) => {
    const sqlQuery = "SELECT * FROM `nets_team`";
    db.query(sqlQuery, callback);
}

const createNew = (playerData, callback) => {
    const sqlQuery = "INSERT INTO `nets_team` SET ?";
    db.query(sqlQuery, playerData, callback);
}

module.exports = {
    getAllTeams,
    getAllNets,
    createNew
}