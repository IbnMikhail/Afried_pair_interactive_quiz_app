
import questionsAndAnswersBank from "./questions.js";
import Quiz from "../quiz.js";

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

let quiz;
let timerInterval;
let timerIsRunning = false;

function stopTimer() {
    quiz.time = 0;
    if (timerIsRunning) {
        clearInterval(timerInterval);
    }
}

function startTimer(){
    quiz.time = 10;

    //console.log(quiz.markedQindices);

    if (quiz.isCompletelyMarked()) {
        scoreDisplay.innerHTML = quiz.score + "/" + quiz.totalQuestions();
        showMsg('congrats');
        return;
    }

    if (!timerInterval) {
        timerInterval = setInterval(() => {
            quiz.timeReducer();
            timerDisplay.innerHTML = quiz.time + " Seconds";
    
            if (quiz.time === 0) {
                //mark the script 0
                quiz.markCurrentQuestion();
                stopTimer();
            }
        }, 1000);
    }
}

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

function restartQuiz(){
    //start new quiz
    startQuiz();
}


function startNext() {
    quiz.nextQuestion();
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");

    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.totalQuestions();
    quiz.markPreviousQuestion();

    //Ensure to stop the old counter else the time counts faster as two counters are counter running
    startTimer();
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
        startTimer();
    });

    btnInCorrectNext.addEventListener("click", (e) =>{
        closeMsg('incorrect');startNext();
        startTimer();
    });

    btnTimeoutNext.addEventListener("click", (e) =>{
        closeMsg('timeout');startNext();
        startTimer();
    });

    btnCongratsStartQuiz.addEventListener("click", (e) =>{
        closeMsg('congrats');restartQuiz();
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
                //Ensure that it is not marked already
                if (!quiz.markedQindices.includes(quiz.currentQindex)) {
                    if (choosen == quiz.correctAnswer) {
                        quiz.markCurrentQuestion();
                        quiz.score += 1;
                        showMsg('correct');
                        
                    } else{
                        quiz.markCurrentQuestion();
                        showMsg('incorrect');
                    }
                } else{
                    alert("Sorry this question has been marked previously. Go to next");
                }
                
            } else{
                showMsg('timeout');
            }
        } else{
            scoreDisplay.innerHTML = quiz.score;
            showMsg('congrats');
        }

        stopTimer();
    });
}

export default quizEvents