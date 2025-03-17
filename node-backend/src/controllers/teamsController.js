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
        return res.status(400).send({ message: 'These fields are required!' });
    }

    try {
        const playerData = {
            pid, firstname, lastname, position, assists, blocks, minutes, points, steals, turnover, player_img
        }

        teamsModel.createNew(playerData, (error, result) => {
            if(error) {
                return res.status(500).send('Internal Server Error!', error);
            }
            return res.status(201).send('New User Added Successfully.');
        }) 
    } catch(error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error!', error);
    }
}

module.exports = {
    getTeams,
    getNetsTeam,
    addPlayer
};