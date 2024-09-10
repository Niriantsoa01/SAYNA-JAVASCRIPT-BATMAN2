
let modal = document.getElementById('myModal');
// Quand l'utilisateur clique sur le bouton, ouvrez la boîte de dialogue si le formulaire est rempli
let btn = document.getElementById('button').addEventListener('click', () => {
    let input = document.querySelectorAll('input');
    if (input.value =='' || input.value == null) {
        modal.style.display = "none";
    } else {
        modal.style.display = 'block';
    }
});


// Quand l'utilisateur clique sur le "x", fermez la boîte de dialogue
let span = document.getElementsByClassName("close")[0].addEventListener('click', () => {
   modal.style.display = "none";
});




// Quand l'utilisateur clique en dehors de la boîte de dialogue, fermez-la
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

