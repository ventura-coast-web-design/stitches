/**
 * Mobile Scroll Carousel + Desktop Traditional Carousel
 */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.product-carousel');
  if (!carousel) return;

  const carouselMain = carousel.querySelector('.carousel-main');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.dot');
  const thumbnails = carousel.querySelectorAll('.thumbnail');
  
  let currentIndex = 0;
  let isTransitioning = false;

  // Mobile carousel (scroll-based)
  function initMobileCarousel() {
    if (window.innerWidth >= 768) return;
    
    let isScrolling = false;

    // Enable smooth scrolling
    carouselMain.style.scrollBehavior = 'smooth';
    
    // Update dots based on scroll position
    carouselMain.addEventListener('scroll', updateMobileDots);
    
    // Initial dot setup
    updateMobileDots();

    function updateMobileDots() {
      if (isScrolling) return;
      
      const slideWidth = carouselMain.offsetWidth * 0.8; // 80% width per slide
      const scrollLeft = carouselMain.scrollLeft;
      const newIndex = Math.round(scrollLeft / slideWidth);
      
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        
        // Update dots
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      if (isScrolling) return;
      
      isScrolling = true;
      const slideWidth = carouselMain.offsetWidth * 0.8; // 80% width per slide
      carouselMain.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
      
      // Update dots immediately
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 300);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  // Desktop carousel (traditional fade)
  function initDesktopCarousel() {
    if (window.innerWidth < 768) return;

    function goToSlide(index) {
      if (isTransitioning || index === currentIndex || index < 0 || index >= slides.length) return;

      isTransitioning = true;
      
      // Remove active class from current slide
      slides[currentIndex].classList.remove('active');
      thumbnails[currentIndex]?.classList.remove('active');
      dots[currentIndex]?.classList.remove('active');

      // Update current index
      currentIndex = index;

      // Add active class to new slide
      slides[currentIndex].classList.add('active');
      thumbnails[currentIndex]?.classList.add('active');
      dots[currentIndex]?.classList.add('active');

      // Reset transition flag
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    // Thumbnail navigation
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  // Initialize based on screen size
  initMobileCarousel();
  initDesktopCarousel();

  // Re-initialize on window resize
  window.addEventListener('resize', () => {
    clearTimeout(window.carouselResizeTimeout);
    window.carouselResizeTimeout = setTimeout(() => {
      // Re-initialize both
      initMobileCarousel();
      initDesktopCarousel();
    }, 250);
  });
});