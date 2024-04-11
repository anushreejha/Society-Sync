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


// Route to check availability
app.get('/checkAvailability', (req, res) => {
    const { facility, date } = req.query;

    const sql = 'SELECT * FROM facilities WHERE facility = ? AND date = ?';
    connection.query(sql, [facility, date], (err, results) => {
        if (err) {
            console.error('Error checking availability:', err);
            res.status(500).json({ message: 'Error checking availability' });
            return;
        }
        if (results.length > 0) {
            res.json({ message: 'Slot is already booked' });
        } else {
            res.json({ message: 'Slot is available' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
