const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'root',
    database: 'housing_management' // Replace 'your_database' with your actual database name
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve facilities.html
app.get('/facilities.html', (req, res) => {
    res.sendFile(__dirname + '/facilities.html');
});

// Handle form submission
app.post('/bookFacility', (req, res) => {
    const { facility, date } = req.body;

    // Insert data into MySQL
    const query = 'INSERT INTO bookings (facility, date) VALUES (?, ?)';
    connection.query(query, [facility, date], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Error inserting data into MySQL.');
            return;
        }
        console.log('Data inserted into MySQL:', results);
        res.send('Facility booked successfully!');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
