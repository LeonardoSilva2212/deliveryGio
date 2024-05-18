document.addEventListener('DOMContentLoaded', () => {
    const carousel3 = document.querySelector('.carousel3');
    const items3 = document.querySelectorAll('.carousel-item3');
    const prevButton = document.querySelector('.carousel-button3.prev');
    const nextButton = document.querySelector('.carousel-button3.next');

    let currentIndex = 0;
    const itemsToShow = 1;
    const itemsToScrow = 1;
    const totalItems = items3.length;
    const maxIndex = totalItems - itemsToShow;

    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carousel3.style.transform = `translateX(${translateX}%)`;
    }

    prevButton.addEventListener('click', () => {
        if(currentIndex > 0){
            currentIndex-= itemsToScrow;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex+= itemsToScrow;
            updateCarousel();
        }
    });

    carousel3.addEventListener('transitionend', () => {
        if (currentIndex < 0){
            currentIndex = 0;
        } else if(currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });
})