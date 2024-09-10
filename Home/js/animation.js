const scrollEffects = document.querySelectorAll('.scroll-effect');

function addScrollEffect(element) {
  // Ajout un événement de scrolling 
  window.addEventListener('scroll', () => {
    // Vérifiez si l'élément est visible
    if (isElementInViewport(element)) {
      // Ajoute la classe "animate" à l'élément
      element.classList.add('animate');
    }
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0 &&
    rect.left <= window.innerWidth &&
    rect.right >= 0
  );
}
scrollEffects.forEach(addScrollEffect);


const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach(anchor => {
  anchor.addEventListener('click', event => {
    event.preventDefault();
    const targetId = anchor.getAttribute('href').split('#')[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});



