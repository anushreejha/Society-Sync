const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'root',
    database: 'housing_management'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src')));
app.use('/scripts', express.static(path.join(__dirname, 'src', 'scripts')));
app.use('/pages', express.static(path.join(__dirname, 'src', 'pages')));

app.post('/bookFacility', (req, res) => {
    const { facility, date } = req.body;

    const sql = 'INSERT INTO facilities (facility, date) VALUES (?, ?)';
    connection.query(sql, [facility, date], (err, result) => {
        if (err) {
            console.error('Error inserting data into database: ' + err.stack);
            res.status(500).send('Error inserting data into database');
            return;
        }

        console.log('Data inserted into database successfully');
        res.status(200).send('Data inserted into database successfully');
    });
});

app.get('/facilities', (req, res) => {
    // Fetch facilities from the database and send them as a response
    const sql = 'SELECT * FROM facilities';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching facilities from database: ' + err.stack);
            res.status(500).send('Error fetching facilities from database');
            return;
        }

        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
