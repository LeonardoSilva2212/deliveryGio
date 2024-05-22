document.addEventListener("DOMContentLoaded", function(){
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const prevButton = document.getElementById(".carousel-button.prev");
    const nextButton = document.getElementById(".carousel-button.next");

    let currentIndex = 0;

    function updateCarousel() {
        const offset = currentIndex * -20;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < items.length - 5) { 
            currentIndex++;
            updateCarousel();
        }
    });
});