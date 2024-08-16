const express = require('express');
const upload = require('../middleware/upload');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/add-user', upload.single('user_img'), userController.addUser);
router.put('/:userID', upload.single('user_img'), userController.updateUser);
router.get('/:userID', userController.getUserById);
router.delete('/:id', userController.deleteUser);

module.exports = router;