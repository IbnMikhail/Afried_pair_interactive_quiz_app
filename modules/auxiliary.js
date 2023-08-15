
import questionsAndAnswersBank from "./questions.js";
import Quiz from "../quiz.js";

let quiz;
const questionDisplay = document.getElementById("question-display");
const answersDisplay = document.getElementsByClassName("answer-area")[0];
const currentQNumDisplay = document.getElementById("current-q-num");
const totalQNumDisplay = document.getElementById("total-q-num"); 
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score"); 
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const btnStartQuiz = document.getElementById("btn-start-quiz");
const btnCorrectNext = document.getElementById("btn-correct-next");
const btnInCorrectNext = document.getElementById("btn-incorrect-next");
const btnTimeoutNext = document.getElementById("btn-timeout-next");
const btnCongratsStartQuiz = document.getElementById("btn-congrats-start-quiz");


function showMsg(typeId) {
    document.getElementById(typeId).style.display = "block";
}

function closeMsg(typeId) {
    document.getElementById(typeId).style.animation = "fadeOut 2s linear 1";
    document.getElementById(typeId).style.display = "none";
}

function startQuiz(){
    quiz = new Quiz(questionsAndAnswersBank);
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");
    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.totalQuestions();

    startTimer();
}

function startTimer(){
    if (quiz.isCompletelyMarked()) {
        scoreDisplay.innerHTML = quiz.score + "/" + quiz.totalQuestions();
        showMsg('congrats');
        return;
    }

    //give a new quiz time
    quiz.time = 10;

    let timingId = setInterval(() => {
        quiz.timer();
        timerDisplay.innerHTML = quiz.time + " Seconds";

        if (quiz.time === 0) {
            //mark the script 0
            quiz.markCurrentQuestion();
        }
    }, 1000);

    return timingId;
}

function startNext() {
    quiz.nextQuestion();
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");

    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.totalQuestions();
    quiz.markPreviousQuestion();

    //Ensure to clear the old counter else the time counts faster as two counters are counter running
    let timingId = startTimer();
    clearInterval(timingId);
}

function quizEvents(){
    document.addEventListener("DOMContentLoaded", (e) => {
        //call this function to start the quiz
        showMsg("start");
    });

    btnStartQuiz.addEventListener("click", (e) =>{
        closeMsg('start');startQuiz();
    });

    btnCorrectNext.addEventListener("click", (e) =>{
        closeMsg('correct');startNext();
    });

    btnInCorrectNext.addEventListener("click", (e) =>{
        closeMsg('incorrect');startNext();
    });

    btnTimeoutNext.addEventListener("click", (e) =>{
        closeMsg('timeout');startNext();
    });

    btnCongratsStartQuiz.addEventListener("click", (e) =>{
        closeMsg('congrats');startQuiz();
    });


    previousBtn.addEventListener("click", (e) => {
        quiz.previousQuestion();
        questionDisplay.innerHTML = quiz.question;
        answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");
        currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
        totalQNumDisplay.innerHTML = quiz.totalQuestions();
    });

    nextBtn.addEventListener("click", (e) => {
        startNext();
    });
    
    answersDisplay.addEventListener("click", (event) => {
        let choosen = event.target.innerText;
    
        if (!quiz.isCompletelyMarked()) {
    
            if (quiz.time > 0) {
                if (choosen == quiz.correctAnswer) {
                    quiz.markCurrentQuestion();
                    quiz.score += 1;
                    showMsg('correct');
                    
                } else{
                    quiz.markCurrentQuestion();
                    showMsg('incorrect');
                }
            } else{
                showMsg('timeout');
            }
        } else{
            scoreDisplay.innerHTML = quiz.score;
            showMsg('congrats');
        }
    });
}

export default quizEvents