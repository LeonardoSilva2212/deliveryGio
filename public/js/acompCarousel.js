document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-acomp');
    const items = document.querySelectorAll('.carousel-item-acomp');
    const prevButton = document.querySelector('.carousel-button-acomp.prev');
    const nextButton = document.querySelector('.carousel-button-acomp.next');

    let currentIndex = 0;
    const itemsToShow = 5;

    function updateCarousel() {
        const translateX = -currentIndex * (100 / itemsToShow);
        carousel.style.transform = `translateX(${translateX}%)`;
    }

    prevButton.addEventListener('click', () => {
        if(currentIndex > 0){
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - itemsToShow) {
            currentIndex++;
            updateCarousel();
        }
    });
});