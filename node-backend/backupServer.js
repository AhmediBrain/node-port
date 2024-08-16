const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    port: '3309',
    user: 'root',
    password: '',
    database: 'node_sample'
});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    return res.json('From Backend !!!');
});

app.get('/users', (req, res) => {
    const sqlQuery = "SELECT * FROM users";
    db.query(sqlQuery, (error, data) => {
        if(error) return res.json(error);
        return res.json(data);
    });
});

app.post('/users/register', async (req, res) => {
    const { user_name, password, user_email, user_phone } = req.body;

    if(!user_name || !password || !user_email) {
        return res.status(400).send({ message: 'These fields are required.'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usersQuery = "INSERT INTO users (user_name, password, user_email, user_phone) VALUES (?, ?, ?, ?)";
        const usersValue = [user_name, hashedPassword, user_email, user_phone];

        db.query(usersQuery, usersValue, (error, result) => {
            if(error) {
                console.log('Error:', error);
                res.status(500).send('Internal Server Error.');
            } 
            else {
                res.status(201).send('User Created Successfully.');
            }
        });
    } catch(error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error.');
    }
});

app.post('/users/login', (req, res) => {
    const { user_name, password } = req.body;

    if(!user_name || !password) {
        return res.status(400).send({ message: 'Username and password are required.'});
    }

    db.query("SELECT * FROM users WHERE user_name = ?", [user_name], async (err, result) => {
        if(err) {
            return res.status(500).send({error: err});
        }
        if(result.length > 0) {
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) {
                return res.status(200).send(user);
            } 
            else {
                return res.status(401).send({ message: 'Invalid credentials.'});
            }
        } 
        else {
            return res.status(404).send({ message: 'User not found.'});
        }
    });
});

app.post('/users/add-user', upload.single('user_img'), async (req, res) => {
    const { user_name, user_email, user_phone, password, firstname, lastname, address, state, country } = req.body;
    const user_img = req.file ? req.file.path : null;

    if(!user_name || !user_email || !password || !firstname || !lastname) {
        return res.status(400).send({ message: 'These fields are required!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usersQuery = "INSERT INTO users (user_name, user_email, user_phone, password, firstname, lastname, address, state, country, user_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const usersValue = [user_name, user_email, user_phone, hashedPassword, firstname, lastname, address, state, country, user_img];

        db.query(usersQuery, usersValue, (error, result) => {
            if(error) {
                res.status(500).send('Internal Server Error!', error);
            } 
            else {
                res.status(201).send('New User Added Successfully.');
            }
        });
    } catch(error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error!', error);
    }
});

app.put('/users/:userID', upload.single('user_img'), (req, res) => {
    const { userID } = req.params;
    const { user_name, user_email, user_phone, firstname, lastname, address, state, country } = req.body;
    let user_img = req.file ? req.file.path : null;

    const findUserQuery = "SELECT user_img FROM users WHERE user_id = ?";
    db.query(findUserQuery, [userID], (findError, findData) => {
        if (findError) {
            return res.status(500).json({ message: 'Internal Server Error', error: findError });
        }

        if (!findData.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user_img) {
            user_img = findData[0].user_img; // Preserve the existing image if no new image is uploaded
        }

        const updateQuery = `
            UPDATE users 
            SET user_name = ?, user_email = ?, user_phone = ?, firstname = ?, lastname = ?, address = ?, state = ?, country = ?, user_img = ?
            WHERE user_id = ?`;

        const updateValues = [user_name, user_email, user_phone, firstname, lastname, address, state, country, user_img, userID];

        db.query(updateQuery, updateValues, (updateError, updateData) => {
            if (updateError) {
                return res.status(500).json({ message: 'Internal Server Error', error: updateError });
            }

            res.status(200).json({ message: 'User Updated Successfully' });
        });
    });
});

// Get User's Information
app.get('/users/:userID', (req, res) => {
    const userID = req.params.userID;
    const sqlQuery = "SELECT * FROM users WHERE user_id = ?";
    db.query(sqlQuery, [userID], (error, data) => {
        if (error) return res.status(500).json(error);
        if (data.length === 0) return res.status(404).json({ message: "User not found" });
        return res.json({ data: data[0] });
    });
});

// Get User's Information

// Delete User
app.delete('/users/:id', (req, res) => {
    const userID = req.params.id;
    const deleteQuery = "DELETE FROM users WHERE user_id = ?"

    db.query(deleteQuery, [userID], (error, result) => {
        if(error) {
            return res.status(500).send('Error deleting user.');
        }
        if(result.affectedRows === 0) {
            return res.status(404).send('User not found.');
        }
        return res.status(200).send('User deleted successfully.');
    });
});
// Delete User

app.listen(8030, () => {
    console.log('Server is listening.');
});
