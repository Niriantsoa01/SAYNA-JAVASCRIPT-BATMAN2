let slideIndex = 1
  showSlides(slideIndex);

  // Contrôles de navigation
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Contrôles de navigation par miniature
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("item");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "";
  }

  document.querySelector('.carousel-control-prev').addEventListener('click', function() {
    plusSlides(-1);
  });
  document.querySelector('.carousel-control-next').addEventListener('click', function() {
    plusSlides(1);
  });

  setInterval(function() {
    plusSlides(1);
  }, 5000)