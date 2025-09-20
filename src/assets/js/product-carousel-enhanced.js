/**
 * Mobile-First Product Carousel - Higher Things Apparel Style
 * Horizontal swipeable gallery with smooth transitions
 */

class MobileProductCarousel {
  constructor() {
    this.carousel = document.querySelector('.product-carousel');
    if (!this.carousel) return;

    this.slides = this.carousel.querySelectorAll('.carousel-slide');
    this.thumbnails = this.carousel.querySelectorAll('.thumbnail');
    this.dots = this.carousel.querySelectorAll('.dot');
    this.carouselMain = this.carousel.querySelector('.carousel-main');
    
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.translateX = 0;
    this.minSwipeDistance = 50;

    this.init();
  }

  init() {
    this.setupMobileLayout();
    this.setupThumbnails();
    this.setupDots();
    this.setupTouchEvents();
    this.setupKeyboard();
    this.updateSlidePositions();
  }

  setupMobileLayout() {
    // On mobile, arrange slides horizontally
    if (window.innerWidth < 768) {
      this.carouselMain.style.display = 'flex';
      this.carouselMain.style.overflow = 'hidden';
      this.carouselMain.style.transition = 'transform 0.3s ease';
      
      this.slides.forEach((slide, index) => {
        slide.style.flex = '0 0 100%';
        slide.style.width = '100%';
        slide.style.order = index;
        if (index === 0) {
          slide.classList.add('active');
        }
      });
    }
  }

  setupThumbnails() {
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }

  setupDots() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }

  setupTouchEvents() {
    // Touch events for mobile swipe
    this.carouselMain.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      this.startX = e.touches[0].clientX;
      this.carouselMain.style.transition = 'none';
    }, { passive: true });

    this.carouselMain.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      
      this.currentX = e.touches[0].clientX;
      const deltaX = this.currentX - this.startX;
      
      // Apply real-time transform during drag
      this.carouselMain.style.transform = `translateX(${-this.currentIndex * 100 + deltaX}%)`;
    }, { passive: true });

    this.carouselMain.addEventListener('touchend', () => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      this.carouselMain.style.transition = 'transform 0.3s ease';
      
      const deltaX = this.currentX - this.startX;
      
      if (Math.abs(deltaX) > this.minSwipeDistance) {
        if (deltaX > 0) {
          this.previousSlide();
        } else {
          this.nextSlide();
        }
      } else {
        // Snap back to current slide
        this.updateSlidePositions();
      }
    }, { passive: true });

    // Mouse events for desktop
    this.carouselMain.addEventListener('mousedown', (e) => {
      if (window.innerWidth >= 768) return; // Only on mobile
      
      this.isDragging = true;
      this.startX = e.clientX;
      this.carouselMain.style.transition = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging || window.innerWidth >= 768) return;
      
      this.currentX = e.clientX;
      const deltaX = this.currentX - this.startX;
      this.carouselMain.style.transform = `translateX(${-this.currentIndex * 100 + deltaX}%)`;
    });

    document.addEventListener('mouseup', () => {
      if (!this.isDragging || window.innerWidth >= 768) return;
      
      this.isDragging = false;
      this.carouselMain.style.transition = 'transform 0.3s ease';
      
      const deltaX = this.currentX - this.startX;
      
      if (Math.abs(deltaX) > this.minSwipeDistance) {
        if (deltaX > 0) {
          this.previousSlide();
        } else {
          this.nextSlide();
        }
      } else {
        this.updateSlidePositions();
      }
    });
  }

  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }

  updateSlidePositions() {
    if (window.innerWidth < 768) {
      this.carouselMain.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentIndex || index < 0 || index >= this.slides.length) return;

    this.isTransitioning = true;
    
    // Remove active class from current slide
    this.slides[this.currentIndex].classList.remove('active');
    this.thumbnails[this.currentIndex]?.classList.remove('active');
    this.dots[this.currentIndex]?.classList.remove('active');

    // Update current index
    this.currentIndex = index;

    // Add active class to new slide
    this.slides[this.currentIndex].classList.add('active');
    this.thumbnails[this.currentIndex]?.classList.add('active');
    this.dots[this.currentIndex]?.classList.add('active');

    // Update position
    this.updateSlidePositions();

    // Reset transition flag
    setTimeout(() => {
      this.isTransitioning = false;
    }, 300);
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileProductCarousel();
});

// Re-initialize on window resize
window.addEventListener('resize', () => {
  clearTimeout(window.carouselResizeTimeout);
  window.carouselResizeTimeout = setTimeout(() => {
    new MobileProductCarousel();
  }, 250);
});