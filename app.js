const express = require('express');
const mysql = require('mysql2');

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'root',
    database: 'housing_management'
});

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
