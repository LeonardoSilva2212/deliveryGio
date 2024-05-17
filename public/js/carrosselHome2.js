document.addEventListener('DOMContentLoaded', () => {
    const carousel2 = document.querySelector('.carousel2');
    const items2 = document.querySelectorAll('.carousel-item2');
    const prevButton = document.querySelector('.carousel-button2.prev');
    const nextButton = document.querySelector('.carousel-button2.next');

    let currentIndex = 0;
    const itemsToShow = 5;

    function updateCarousel() {
        const translateX = -currentIndex * (100 / itemsToShow);
        carousel2.style.transform = `translateX(${translateX}%)`;
    }

    prevButton.addEventListener('click', () => {
        if(currentIndex > 0){
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items2.length - itemsToShow) {
            currentIndex++;
            updateCarousel();
        }
    });
});