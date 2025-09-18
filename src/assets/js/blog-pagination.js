// document.addEventListener('DOMContentLoaded', function() {
//   const blogContainer = document.querySelector('.blog-posts-container');
//   const blogPosts = document.querySelectorAll('.blog-post');
//   const mobilePrevButton = document.querySelector('.mobile-pagination .prev');
//   const mobileNextButton = document.querySelector('.mobile-pagination .next');
//   const mobilePaginationText = document.querySelector('.mobile-pagination .pagination-text');
//   const desktopPrevButton = document.querySelector('.desktop-pagination .prev');
//   const desktopNextButton = document.querySelector('.desktop-pagination .next');
//   const desktopPaginationText = document.querySelector('.desktop-pagination .pagination-text');
  
//   if (!blogContainer || blogPosts.length === 0) return;
  
//   let mobileCurrentIndex = 0;
//   let desktopCurrentPage = 0;
//   const totalPosts = blogPosts.length;
//   const postsPerPage = 3;
//   const totalPages = Math.ceil(totalPosts / postsPerPage);
  
//   // Only enable pagination on mobile
//   function isMobile() {
//     return window.innerWidth < 768;
//   }
  
//   function updateMobilePagination() {
//     if (!isMobile()) return;
    
//     // Mobile pagination - show only current post
//     blogPosts.forEach((post, index) => {
//       if (index === mobileCurrentIndex) {
//         post.style.display = 'block';
//         post.style.opacity = '1';
//         post.style.transform = 'translateX(0)';
//       } else {
//         post.style.display = 'none';
//         post.style.opacity = '0';
//         post.style.transform = 'translateX(100%)';
//       }
//     });
    
//     // Update mobile pagination text
//     if (mobilePaginationText) {
//       mobilePaginationText.textContent = `${mobileCurrentIndex + 1}/${totalPosts}`;
//     }
    
//     // Update mobile button states
//     if (mobilePrevButton) {
//       mobilePrevButton.disabled = mobileCurrentIndex === 0;
//       mobilePrevButton.style.opacity = mobileCurrentIndex === 0 ? '0.5' : '1';
//     }
    
//     if (mobileNextButton) {
//       mobileNextButton.disabled = mobileCurrentIndex === totalPosts - 1;
//       mobileNextButton.style.opacity = mobileCurrentIndex === totalPosts - 1 ? '0.5' : '1';
//     }
//   }
  
//   function updateDesktopPagination() {
//     if (isMobile()) return;
    
//     // Desktop pagination - show 3 posts per page
//     const startIndex = desktopCurrentPage * postsPerPage;
//     const endIndex = Math.min(startIndex + postsPerPage, totalPosts);
    
//     blogPosts.forEach((post, index) => {
//       if (index >= startIndex && index < endIndex) {
//         post.style.display = 'block';
//         post.style.opacity = '1';
//         post.style.transform = 'none';
//       } else {
//         post.style.display = 'none';
//         post.style.opacity = '0';
//         post.style.transform = 'none';
//       }
//     });
    
//     // Update desktop pagination text
//     if (desktopPaginationText) {
//       desktopPaginationText.textContent = `${desktopCurrentPage + 1}/${totalPages}`;
//     }
    
//     // Update desktop button states
//     if (desktopPrevButton) {
//       desktopPrevButton.disabled = desktopCurrentPage === 0;
//       desktopPrevButton.style.opacity = desktopCurrentPage === 0 ? '0.5' : '1';
//     }
    
//     if (desktopNextButton) {
//       desktopNextButton.disabled = desktopCurrentPage === totalPages - 1;
//       desktopNextButton.style.opacity = desktopCurrentPage === totalPages - 1 ? '0.5' : '1';
//     }
//   }
  
//   function updatePagination() {
//     if (isMobile()) {
//       updateMobilePagination();
//     } else {
//       updateDesktopPagination();
//     }
//   }
  
//   function goToMobileNext() {
//     if (mobileCurrentIndex < totalPosts - 1) {
//       mobileCurrentIndex++;
//       updateMobilePagination();
//     }
//   }
  
//   function goToMobilePrev() {
//     if (mobileCurrentIndex > 0) {
//       mobileCurrentIndex--;
//       updateMobilePagination();
//     }
//   }
  
//   function goToDesktopNext() {
//     if (desktopCurrentPage < totalPages - 1) {
//       desktopCurrentPage++;
//       updateDesktopPagination();
//     }
//   }
  
//   function goToDesktopPrev() {
//     if (desktopCurrentPage > 0) {
//       desktopCurrentPage--;
//       updateDesktopPagination();
//     }
//   }
  
//   // Event listeners for mobile pagination
//   if (mobileNextButton) {
//     mobileNextButton.addEventListener('click', goToMobileNext);
//   }
  
//   if (mobilePrevButton) {
//     mobilePrevButton.addEventListener('click', goToMobilePrev);
//   }
  
//   // Event listeners for desktop pagination
//   if (desktopNextButton) {
//     desktopNextButton.addEventListener('click', goToDesktopNext);
//   }
  
//   if (desktopPrevButton) {
//     desktopPrevButton.addEventListener('click', goToDesktopPrev);
//   }
  
//   // Handle window resize
//   window.addEventListener('resize', updatePagination);
  
//   // Initialize pagination
//   updatePagination();
// }); 