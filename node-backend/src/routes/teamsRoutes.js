const express = require('express');
const upload = require('../middleware/upload');
const teamsController = require('../controllers/teamsController');

const router = express.Router();

router.get('/', teamsController.getTeams);
router.post('/add-player', upload.single('player_img'), teamsController.addPlayer);

module.exports = router;