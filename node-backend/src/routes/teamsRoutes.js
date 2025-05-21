const express = require('express');
const upload = require('../middleware/upload');
const teamsController = require('../controllers/teamsController');

const router = express.Router();

router.get('/', teamsController.getTeams);
router.get('/nets-team', teamsController.getNetsTeam);
router.post('/add-player', upload.single('player_img'), teamsController.addPlayer);
router.delete('/:id', teamsController.deletePlayerID);

module.exports = router;