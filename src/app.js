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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
