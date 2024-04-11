$(document).ready(function() {
    $('#facility-form').submit(function(event) {
        event.preventDefault(); 

        const selectedFacility = $('#facility').val();
        const selectedDate = $('#date').val();

        // Check availability
        $.ajax({
            url: 'http://localhost:3000/checkAvailability', // Update the URL to match your server endpoint
            method: 'GET',
            data: { facility: selectedFacility, date: selectedDate },
            success: function(response) {
                $('#availability-message').text(response.message);
            },
            error: function(error) {
                console.error('Error checking availability:', error);
            }
        });
        
    });
});
