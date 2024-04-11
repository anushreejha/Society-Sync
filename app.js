// app.js
const express = require('express');
const mysql = require('mysql2');
const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'facility_booking_db'
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Form submission route
app.post('/submit_booking', (req, res) => {
    const { facility, date, time_start, time_end, name, email } = req.body;

    // Insert data into MySQL database
    connection.query('INSERT INTO bookings (facility, date, time_start, time_end, name, email) VALUES (?, ?, ?, ?, ?, ?)',
        [facility, date, time_start, time_end, name, email],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error inserting data into database');
                return;
            }

            res.send('Booking successful!');
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
