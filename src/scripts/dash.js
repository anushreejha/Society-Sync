$(document).ready(function() {
    $('#facility-form').submit(function(event) {
        event.preventDefault(); 

        const selectedFacility = $('#facility').val();
        const selectedDate = $('#date').val();

        // Check availability
        $.ajax({
            url: '/checkAvailability',
            method: 'GET', // Change method to GET
            data: { facility: selectedFacility, date: selectedDate }, // Pass data as query parameters
            success: function(response) {
                $('#availability-message').text(response.message);
            },
            error: function(error) {
                console.error('Error checking availability:', error);
            }
        });
    });
});
