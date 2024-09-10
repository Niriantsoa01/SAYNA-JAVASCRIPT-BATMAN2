document.addEventListener('DOMContentLoaded', function() {
    const accessToken = 'd24fdc49ddb3f252595843d96a9a80bc';
    let url = `https://superheroapi.com/api.php/${accessToken}/search/batman`;

    let startButton = document.getElementById('start');
    let gameContainer = document.getElementById('game');
    let questionElement = document.getElementById('question');
    let gameImage = document.getElementById('question-image');
    let answerContainer = document.getElementById('answers');
    let restartButton = document.querySelector('.restart');
    let submitButton = document.getElementById('submit');
    let modal = document.querySelector('.modal');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let questionCreated = false;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Données reçues:', data.results);

            let hero0 = data.results[0];
            console.log('Super-héros 0:', hero0.name);
            let hero1 = data.results[1];
            console.log('Super-héros 1:', hero1.name);
            let hero2 = data.results[2];
            console.log('Super-héros 2:', hero2.name);


            createQuestions(data.results);
        });


    function createQuestions (superheroes)  {

        if (questionCreated) {
            console.log('createQuestions déjà appelée');
            return;
        }

        console.log('Appel de createQuestions');
        questionCreated = true;

        superheroes.forEach(superhero => {
            console.log('URL de l\'image:', superhero.image.url);
            let ImageUrl = [
                'https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg',
                'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
                'https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg'
            ];
            let superheroQuestions = [

                {
                    question: `Quelle est la race de ce super-héros?`,
                    image: ImageUrl[0],
                    answers: [
                        { text: 'Human', correct: true },
                        { text: 'Animal', correct: false },
                        { text: 'Néandertal', correct: false },
                        { text: 'Robot', correct: false }
                    ],
                },

                {
                    question: `Quelle est la profession de l'homme qui travaille avec lui ?`,
                    image: ImageUrl[1],
                    answers: [
                        { text: 'Businessman', correct: true },
                        { text: 'Armeur', correct: false },
                        { text: 'Médecin', correct: false },
                        { text: 'Dentiste', correct: false }
                    ],
                },

                {
                    question: `Quelle est la taille du super-héros?`,
                    image: ImageUrl[2],
                    answers: [
                        { text: '178 m', correct: true },
                        { text: '1,80 m', correct: false },
                        { text: '1,75 m', correct: false },
                        { text: '1,60 m', correct: false }
                    ],
                },

                {
                    question: `Quelle est la couleur du super-héros?`,
                    image: ImageUrl[0],
                    answers: [
                        { text: superhero.appearance['eye-color'], correct: true },
                        { text: 'Blanc', correct: false },
                        { text: 'Noir', correct: false },
                        { text: 'Marron', correct: false }
                    ],
                },

                {
                    question: `Quelle est la couleur des cheveux du super-héros?`,
                    image: ImageUrl[1],
                    answers: [
                        { text: superhero.appearance['hair-color'], correct: true },
                        { text: 'Blanc', correct: false },
                        { text: 'Noir', correct: false },
                        { text: 'Marron', correct: false }
                    ],
                }
            ];

            questions.push(...superheroQuestions);
        });

        console.log(`Nombre de questions créées: ${questions.length / 3}`);
    };

    function startQuiz() {
        score = 0;
        showQuestion();
    }

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        gameContainer.style.display = 'block';
        startQuiz();
    });

    function showQuestion() {
        if (currentQuestionIndex >= questions.length / 3) {
            endQuiz();
            return;
        }

        let currentQuestion = questions[currentQuestionIndex];
        console.log(currentQuestion);

        questionElement.textContent = currentQuestion.question;
        
        gameImage.src = currentQuestion.image;
       
        answerContainer.innerHTML = '';

        submitButton.disabled = true;

        currentQuestion.answers.forEach((option, index) => {
            let div = document.createElement('div');
            div.classList.add('div');
            div.style.display = 'flex';
            div.style.alignItems = 'center';

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `answer-${index}`;
            checkbox.name = 'answer';

            let label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.textContent = option.text;

            div.appendChild(checkbox);
            div.appendChild(label);
            answerContainer.appendChild(div);

            checkbox.addEventListener('change', () => {
                submitButton.disabled = false;
              //  alert('Une seule repose est validé');
            });
        });

        submitButton.style.display = 'block';
    }

    submitButton.addEventListener('click', function() {
        console.log('clicked');

        let checkedAnswers = document.querySelectorAll('input[name="answer"]:checked');
        let correct = false;

        checkedAnswers.forEach(checkbox => {
            let index = checkbox.id.split('-').pop();
            if (questions[currentQuestionIndex].answers[index].correct) {
                correct = true;
            }
        });

        if (correct) {
            score++;
        }

        currentQuestionIndex++;

        // j'ai supp endquiz();

        if (currentQuestionIndex >= questions.length / 3) {
            endQuiz(); 
        } else {
            showQuestion();
        }
            if (score === questions.length / 3) {
            // Toutes les réponses sont correctes
            let resultElement = document.createElement('h2');
            resultElement.textContent = ` ${score} / ${questions.length / 3}  FÉLICITATIONS !`;
            modal.style.display = 'block';
            let modalContent = document.createElement('p');
            modalContent.textContent = " Félicitations ! Vous êtes un vrai expert en super-héros !";
            gameContainer.style.display = "none";
            submitButton.style.display = "none";
            restartButton.style.display = 'block';
            modal.appendChild(restartButton);
            modal.appendChild(resultElement);
            modal.appendChild(modalContent);

        } else if (currentQuestionIndex === questions.length /3 && score <= 2) {
            let resultElement = document.createElement('h2');
            resultElement.textContent = ` ${score} / ${questions.length / 3}  C'EST PAS TOUT A FAIT CA`;
            modal.style.display = 'block';
            let modalContent = document.createElement('p');
            modalContent.textContent = " Oula ! Heuresement que le Riddler est sous les verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être les masques qui vous a bloqué la vue ! Aller rien n'est perdu !";
            gameContainer.style.display = "none";
            submitButton.style.display = "none";
            restartButton.style.display = 'block';
            modal.appendChild(restartButton);
            modal.appendChild(resultElement);
            modal.appendChild(modalContent);    
        }

        else if (currentQuestionIndex === questions.length / 3 && score >= 3) {
            let resultElement = document.createElement('h2');
            resultElement.textContent = ` ${score} / ${questions.length / 3}  PAS MAL !`;
            modal.style.display = 'block';
            let modalContent = document.createElement('p');
            modalContent.textContent = " Pas mal ! Continue comme ca .";
            gameContainer.style.display = "none";
            submitButton.style.display = "none";
            restartButton.style.display = 'block';
            modal.appendChild(restartButton);
            modal.appendChild(resultElement);
            modal.appendChild(modalContent);
        }

        else {

            showQuestion();
        }

    });

   
    restartButton.addEventListener('click', restart);
    function restart() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.style.display = 'block';
    modal.style.display = "none";
    modal.innerHTML = '';
    gameContainer.style.display = 'block';
    showQuestion();
};

    function endQuiz() {
        gameContainer.style.display = 'none';
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
    }
});

