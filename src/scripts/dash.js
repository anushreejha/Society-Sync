$(document).ready(function() {
    $('#facility-form').submit(function(event) {
        event.preventDefault(); 

        const selectedFacility = $('#facility').val();
        const selectedDate = $('#date').val();

        // Check availability
        $.ajax({
            url: '/checkAvailability',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ facility: selectedFacility, date: selectedDate }),
            success: function(response) {
                $('#availability-message').text(response.message);
            },
            error: function(error) {
                console.error('Error checking availability:', error);
            }
        });
    });
});
