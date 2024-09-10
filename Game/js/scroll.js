// Get the prev-haut and next-bas buttons
const prevHaut = document.querySelector('.prev-haut');
const nextBas = document.querySelector('.next-bas');
const scrollSpeed = 50; 

prevHaut.addEventListener('click', () => {
  window.scrollBy(0, -scrollSpeed);
});

nextBas.addEventListener('click', () => {
  window.scrollBy(0, scrollSpeed);
});