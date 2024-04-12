const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Facilities Booking System');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'root',
    database: 'housing_management'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'src')));
app.use('/scripts', express.static(path.join(__dirname, 'src', 'scripts')));
app.use('/pages', express.static(path.join(__dirname, 'src', 'pages')));

app.get('/checkAvailability', (req, res) => {
    const { facility, date } = req.query;

    const sql = 'SELECT * FROM facilities WHERE facility = ? AND date = ?';
    connection.query(sql, [facility, date], (err, results) => {
        if (err) {
            console.error('Error checking availability for facilities:', err);
            res.status(500).json({ message: 'Error checking availability for facilities' });
            return;
        }
        if (results.length > 0) {
            res.json({ message: 'Slot is already booked for facilities' });
        } else {
            res.json({ message: 'Slot is available for facilities' });
        }
    });
});

app.post('/addEvent', (req, res) => {
    const eventData = req.body;
    const sql = 'INSERT INTO events (title, date, description) VALUES (?, ?, ?)';
    connection.query(sql, [eventData.title, eventData.date, eventData.description], (err, results) => {
        if (err) {
            console.error('Error adding event:', err);
            res.status(500).json({ message: 'Error adding event' });
            return;
        }
        res.json({ message: 'Event added successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
