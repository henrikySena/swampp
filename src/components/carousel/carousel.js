import './carousel.css';

export function carousel() {
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  const updateCarousel = () => {
    const slideWidth = slides[0].clientWidth;
    const slidesContainer = document.getElementById('slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  let slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 5000);

  const restartAutoSlide = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 5000);
  };

  document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
    restartAutoSlide();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
    restartAutoSlide();
  });
}