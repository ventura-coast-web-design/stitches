document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.product-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const thumbnails = carousel.querySelectorAll('.thumbnail');
  const prevBtn = carousel.querySelector('.carousel-nav.prev');
  const nextBtn = carousel.querySelector('.carousel-nav.next');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    // Show current slide and thumbnail
    slides[index].classList.add('active');
    thumbnails[index].classList.add('active');

    currentIndex = index;

    // Update navigation button states
    if (prevBtn) {
      prevBtn.disabled = index === 0;
      prevBtn.style.opacity = index === 0 ? '0.5' : '1';
    }

    if (nextBtn) {
      nextBtn.disabled = index === totalSlides - 1;
      nextBtn.style.opacity = index === totalSlides - 1 ? '0.5' : '1';
    }
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    showSlide(prevIndex);
  }

  // Event listeners for navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Event listeners for thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => showSlide(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;

  carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
    }
  }

  // Initialize carousel
  showSlide(0);
}); 