document.addEventListener("DOMContentLoaded", function() {
    function populateFacilities() {
        fetch('/bookFacility') 
            .then(response => response.json())
            .then(facilities => {
                const facilitiesListElement = document.getElementById('facilities-list');
                facilitiesListElement.innerHTML = ''; 

                facilities.forEach(facility => {
                    const facilityElement = document.createElement('div');
                    facilityElement.textContent = `Facility booked: ${facility.facility} on ${facility.date}`;
                    facilitiesListElement.appendChild(facilityElement);
                });
            })
            .catch(error => console.error('Error fetching facilities:', error));
    }

    populateFacilities();
});
