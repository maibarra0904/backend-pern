document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.swagger-ui .topbar-wrapper img');
    if (logo) {
      logo.alt = '';
    }
  });