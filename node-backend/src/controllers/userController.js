// src/controllers/userController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const getUsers = (req, res) => {
    userModel.getAllUsers((error, data) => {
        if (error) return res.json(error);
        return res.json(data);
    });
};

const registerUser = async (req, res) => {
    const { user_name, password, user_email, user_phone } = req.body;

    if (!user_name || !password || !user_email) {
        return res.status(400).send({ message: 'These fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { user_name, password: hashedPassword, user_email, user_phone };

        userModel.createUser(userData, (error, result) => {
            if (error) {
                console.log('Error:', error);
                res.status(500).send('Internal Server Error.');
            } else {
                res.status(201).send('User Created Successfully.');
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error.');
    }
};

const loginUser = (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    userModel.getUserByUsername(user_name, async (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }
        if (result.length > 0) {
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.status(200).send(user);
            } else {
                return res.status(401).send({ message: 'Invalid credentials.' });
            }
        } else {
            return res.status(404).send({ message: 'User not found.' });
        }
    });
};

const addUser = async (req, res) => {
    const { user_name, user_email, user_phone, password, firstname, lastname, address, state, country } = req.body;
    const user_img = req.file ? req.file.path : null;

    if (!user_name || !user_email || !password || !firstname || !lastname) {
        return res.status(400).send({ message: 'These fields are required!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            user_name, user_email, user_phone, password: hashedPassword,
            firstname, lastname, address, state, country, user_img
        };

        userModel.createUser(userData, (error, result) => {
            if (error) {
                res.status(500).send('Internal Server Error!', error);
            } else {
                res.status(201).send('New User Added Successfully.');
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error!', error);
    }
};

const updateUser = (req, res) => {
    const { userID } = req.params;
    const { user_name, user_email, user_phone, firstname, lastname, address, state, country } = req.body;
    let user_img = req.file ? req.file.path : null;

    userModel.getUserById(userID, (findError, findData) => {
        if (findError) {
            return res.status(500).json({ message: 'Internal Server Error', error: findError });
        }

        if (!findData.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user_img) {
            user_img = findData[0].user_img;
        }

        const userData = { user_name, user_email, user_phone, firstname, lastname, address, state, country, user_img };

        userModel.updateUser(userID, userData, (updateError, updateData) => {
            if (updateError) {
                return res.status(500).json({ message: 'Internal Server Error', error: updateError });
            }

            res.status(200).json({ message: 'User Updated Successfully' });
        });
    });
};

const getUserById = (req, res) => {
    const { userID } = req.params;

    userModel.getUserById(userID, (error, data) => {
        if (error) return res.status(500).json(error);
        if (data.length === 0) return res.status(404).json({ message: "User not found" });
        return res.json({ data: data[0] });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    userModel.deleteUser(id, (error, result) => {
        if (error) {
            return res.status(500).send('Error deleting user.');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found.');
        }
        return res.status(200).send('User deleted successfully.');
    });
};

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    addUser,
    updateUser,
    getUserById,
    deleteUser,
};