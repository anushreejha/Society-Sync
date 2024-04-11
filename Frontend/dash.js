document.addEventListener("DOMContentLoaded", function() {
    const mysql = require('mysql2');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'your_mysql_username',
        password: 'your_mysql_password',
        database: 'housing_management'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }

        console.log('Connected to MySQL database.');
    });

    function populateEvents() {
        connection.query('SELECT * FROM events', function(err, results) {
            if (err) {
                console.error('Error fetching events from database: ' + err.stack);
                return;
            }

            const eventListElement = document.getElementById('event-list');
            eventListElement.innerHTML = ''; // Clear existing content

            results.forEach(function(event) {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');

                const titleElement = document.createElement('h3');
                titleElement.textContent = event.title;

                const dateElement = document.createElement('p');
                dateElement.textContent = event.date;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = event.description;

                eventElement.appendChild(titleElement);
                eventElement.appendChild(dateElement);
                eventElement.appendChild(descriptionElement);

                eventListElement.appendChild(eventElement);
            });
        });
    }

    function populateFacilities() {
        connection.query('SELECT * FROM facilities', function(err, results) {
            if (err) {
                console.error('Error fetching facilities from database: ' + err.stack);
                return;
            }

            const facilitiesListElement = document.getElementById('facilities-list');
            facilitiesListElement.innerHTML = ''; // Clear existing content

            results.forEach(function(facility) {
                const facilityElement = document.createElement('div');
                facilityElement.textContent = `Facility booked: ${facility.facility} on ${facility.date}`;
                facilitiesListElement.appendChild(facilityElement);
            });
        });
    }

    populateEvents();
    populateFacilities();
});
