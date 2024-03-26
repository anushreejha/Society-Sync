document.addEventListener("DOMContentLoaded", function() {
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000);
    }

    var modal = document.getElementById("loginModal");
    var span = document.getElementsByClassName("close")[0];

    setTimeout(function() {
        modal.style.display = "block";
    }, 2000 * document.getElementsByClassName("mySlides").length);

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById("loginButton").addEventListener("click", function() {
        window.location.href = "about.html";
    });
});
