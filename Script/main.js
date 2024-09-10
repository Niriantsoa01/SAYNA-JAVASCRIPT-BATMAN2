document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    if (path.includes('/Home/')) {
      document.getElementById('nav-home').classList.add('active');
    } else {
      document.getElementById('nav-game').classList.add('active');
    } 
  });