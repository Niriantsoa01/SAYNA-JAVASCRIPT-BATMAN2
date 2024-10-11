let modal = document.getElementById('myModal');
let form = document.querySelector('form');
let input = document.querySelector('form input');
let btn = document.getElementById('button');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submit();
});

btn.addEventListener('click', envoyer);
function envoyer() {
    
    if (input.value == '' || input.value == null) {
        modal.style.display = "none";
        console.log('remplir')
    } else {
        modal.style.display = 'block';
        input.value = '';
        input.required = false;
    }  
    /*
   modal.style.display = 'block';
   */
    
};


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

