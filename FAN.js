document.querySelectorAll('.section').forEach(section => {
    const slider = section.querySelector('.image-slider');
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;

    const updateSlider = () => {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentIndex);
        });
    };

    section.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    });

    section.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    });
});