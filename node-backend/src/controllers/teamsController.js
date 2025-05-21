const teamsModel = require('../models/teamsModel');

const getTeams = (req, res) => {
    teamsModel.getAllTeams((error, data) => {
        if(error) return res.status(500).json({ message: "Database error", error });
        return res.json(data);
    });
}

const getNetsTeam = (req, res) => {
    teamsModel.getAllNets((error, data) => {
        if(error) return res.status(500).json({ message: 'Database error', error });
        return res.json(data);
    });
}

const addPlayer = async (req, res) => {
    const { pid, firstname, lastname, position, assists, blocks, minutes, points, steals, turnover } = req.body;

    const player_img = req.file ? req.file.path : null;

    if(!pid || !firstname || !lastname || !position || !assists || !blocks || !minutes || !points) {
        return res.status(400).send({ message: 'These fields are required.' });
    }

    try {
        const playerData = {
            pid, firstname, lastname, position, assists, blocks, minutes, points, steals, turnover, player_img
        }

        teamsModel.createNew(playerData, (error, result) => {
            if(error) {
                return res.status(500).send('Internal server error:', error);
            }
            return res.status(201).send('New player added successfully.');
        });
    } catch(error) {
        return res.status(500).send('Internal server error:', error);
    }
}

const deletePlayerID = (req, res) => {
    const { id } = req.params;

    teamsModel.deletePlayer(id, (error, result) => {
        if(error) {
            return res.status(500).send('Error deleting player.');
        }
        if(result.affectedRows === 0) {
            return res.status(404).send('Player not found.');
        }
        return res.status(200).send('Player deleted successfully.');
    });
}

module.exports = {
    getTeams,
    getNetsTeam,
    addPlayer,
    deletePlayerID
};