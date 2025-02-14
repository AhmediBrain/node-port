// src/models/userModel.js
const db = require('../config/db');

const getAllUsers = (callback) => {
    const sqlQuery = "SELECT * FROM users";
    db.query(sqlQuery, callback);
};

const createUser = (userData, callback) => {
    const sqlQuery = "INSERT INTO users SET ?";
    db.query(sqlQuery, userData, callback);
};

const getUserByUsername = (username, callback) => {
    const sqlQuery = "SELECT * FROM users WHERE user_name = ?";
    db.query(sqlQuery, [username], callback);
};

const getUserById = (userID, callback) => {
    const sqlQuery = "SELECT * FROM users WHERE user_id = ?";
    db.query(sqlQuery, [userID], callback);
};

const updateUser = (userID, userData, callback) => {
    const sqlQuery = "UPDATE users SET ? WHERE user_id = ?";
    db.query(sqlQuery, [userData, userID], callback);
};

const deleteUser = (userID, callback) => {
    const sqlQuery = "DELETE FROM users WHERE user_id = ?";
    db.query(sqlQuery, [userID], callback);
};

const updateUserName = (userID, userData, callback) => {
    const sqlQuery = "UPDATE users SET user_name = ? WHERE user_id = ?"
    db.query(sqlQuery, [userData, userID], callback);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser,
    updateUserName
};