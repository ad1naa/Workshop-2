console.log('Suntem conectati');

class Quiz {
    constructor(questions){}
}

//primul pas: preluam datele 
async function fetchData() {
    try {
        const data = await fetch('./questions.json') //va prelua datele din fisierul question.json
        //if(data.ok) {
            const questions = await data.json()
            //console.log(questions); //am primit intrebarile
            return questions;
        //}
        
    } catch(error) {
        console.log(error);
    }
    } //functia doar preia datele (intrebarile) si le trasnforma din json in variabile javascript
    
fetchData(); //chemama functia pt a ne aparea in consola rasp.

//pasul 2: selectam elem din html pentru a le putea folosi
const questionContainer = document.getElementById('question-container');
const question = document.getElementById('question');
const answerBtns = document.getElementsByTagName('li'); //colectie de elem
const feedbackCOntainer = document.getElementById('feedback-container');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-button');
const resetBtn = document.getElementById('reset-button');
const modalContainer = document.getElementsByClassName('modal-container');


let index = 0; //numarul intrebarii
let questions = [];


//pasul 4: trecerea la urm intrebare cand se apasa butonul next
function onNext() {
    index++;
    populateQuiz(questions[index]);
    if(index===questions.length) {
        modalContainer[0].classList.remove('hide');
    }

}

function onReset() {
    index = 0;
    populateQuiz(questions[index]);
    modalContainer[0].classList.add('hide');
}

function onAnswerSelect(answer,btn,explanation) {
    //answer.correct ? btn.classList.add('correct') : btn.classList.add('wrong');
    if(answer.correct){
        btn.classList.add('correct');
        nextBtn.removeAttribute('disabled');
        feedback.textContent = explanation;
        feedback.className = 'text-correct';
    } else {
        btn.classList.add('wrong');
        feedback.textContent = 'Răspuns incorect. Te rog să încerci din nou.'
        feedback.className = 'text-wrong';
    }
    

}

function resetAnswers(btn) {
    if(btn.classList.contains('correct')){
        btn.classList.remove('correct');
    }
    if(btn.classList.contains('wrong')){
        btn.classList.remove('wrong');
    }
    

}



///pasul 3: adaugam intrebarile in quiz
function populateQuiz(currentQuestion) { //functia va primi ca parametru intrebarea curenta
    if(index < questions.length) {
        question.textContent = currentQuestion.question; //in interiorul elem question din html se va scrie prop question a obiectului corespunzator elem cu index-ul precizat din array-ul de intrebari
        const answers = currentQuestion.answers.map(element => element.text)
        for(let i=0; i<answerBtns.length; i++) {
            answerBtns[i].lastChild.textContent = answers[i];   //answerBtns[i].lastChild -> butonul raspunsului
            answerBtns[i].lastChild.addEventListener('click', () => {onAnswerSelect(currentQuestion.answers[i],answerBtns[i].lastChild,currentQuestion.explanation)})
            resetAnswers(answerBtns[i].lastChild)
        }
        nextBtn.setAttribute('disabled','');
        feedback.textContent = '';
    }
    
    
}




document.addEventListener('DOMContentLoaded', async () => {
    questions = await fetchData();
    populateQuiz(questions[index]);
    nextBtn.setAttribute('disabled','');
    nextBtn.addEventListener('click', onNext);
    resetBtn.addEventListener('click', onReset);
})