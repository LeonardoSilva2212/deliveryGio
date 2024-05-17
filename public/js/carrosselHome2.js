document.addEventListener('DOMContentLoaded', () => {
    const carousel2 = document.querySelector('.carousel2');
    const items2 = document.querySelectorAll('.carousel-item2');
    const prevButton = document.querySelector('.carousel-button2.prev');
    const nextButton = document.querySelector('.carousel-button2.next');

    let currentIndex = 0;
    const itemsToShow = 3;
    const itemsToScrow = 1.5;
    const totalItems = items2.length;
    const maxIndex = totalItems - itemsToShow;


    function updateCarousel() {
        const translateX = -currentIndex * (115 / itemsToShow);
        carousel2.style.transform = `translateX(${translateX}%)`;
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

    carousel2.addEventListener('transitionend', () => {
        if (currentIndex < 0){
            currentIndex = 0;
        } else if(currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });
});