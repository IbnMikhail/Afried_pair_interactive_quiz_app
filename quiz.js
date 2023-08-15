
/**
 * 
 * @param {object} questionsAndAnswersBank - The array<int, object>of the questions, their array answers and correctAnswer e.g
 * [
 * {question: "Where is nigeria?", answers: ["Africa", "North America", "South America", "Asia", "None of the above"],correctAnswer : "Africa"},
 * {question: "Who is the president of Nigeria?", answers: ["Atiku", "Buhari", "Obasanjo", "Shagari", "None of the above"],correctAnswer : "None of the above"},
 * ]
 */
function Quiz(questionsAndAnswersBank){
    this.currentQindex = 0;
    this.questionsAndAnswersBank = questionsAndAnswersBank;
    this.question = this.questionsAndAnswersBank[this.currentQindex].question;
    this.answers = this.questionsAndAnswersBank[this.currentQindex].answers;
    this.correctAnswer = this.questionsAndAnswersBank[this.currentQindex].correctAnswer;
    this.time = 10;
    this.score = 0;
    this.markedQindices = [];

    this.start = () => {
        new Quiz(questionsAndAnswersBank);
    }

    this.restart = () => {
        this.start();
    }

    this.getCurrentQuestion = () => this.question;
    
    this.totalQuestions = () => quiz.questionsAndAnswersBank.length;

    this.nextQuestion = () => {
        if (this.currentQindex < this.questionsAndAnswersBank.length - 1) {
            this.currentQindex++;
            this.question = this.questionsAndAnswersBank[this.currentQindex].question;
            this.answers = this.questionsAndAnswersBank[this.currentQindex].answers;
            this.correctAnswer = this.questionsAndAnswersBank[this.currentQindex].correctAnswer;
        }
    }

    this.previousQuestion = () => {
        if (this.currentQindex > 0) {
            this.currentQindex--;
            this.question = this.questionsAndAnswersBank[this.currentQindex].question;
            this.answers = this.questionsAndAnswersBank[this.currentQindex].answers;
            this.correctAnswer = this.questionsAndAnswersBank[this.currentQindex].correctAnswer;
        }
    }

    this.timer = () => {
        if (this.time > 0) {
            this.time -= 1;
        }
    }

    //call this to mark the current question
    this.markCurrentQuestion = function(){
        if (!this.markedQindices.find((index) => index == this.currentQindex)) {
            this.markedQindices.push(this.currentQindex);
        }
    }

    this.markPreviousQuestion = function(){
        if (this.currentQindex > 0 && !this.markedQindices.find((index) => index == this.currentQindex - 1)) {
            this.markedQindices.push(this.currentQindex - 1);
        }
    }

    this.isCompletelyMarked = () => this.markedQindices.length == this.questionsAndAnswersBank.length;

}

const questionsAndAnswersBank =    [
    {question: "Where is nigeria?", answers: ["Africa", "North America", "South America", "Asia", "None of the above"], correctAnswer: "Africa"},
    {question: "Who is the current president of Nigeria?", answers: ["Shehu", "Buhari", "Obasanjo", "Shagari", "None of the above"], correctAnswer: "None of the above"},
    {question: "How many colors does rainbow have?", answers: ["12", "5", "11", "7", "None of the above"], correctAnswer: "7"},
    {question: "Which of these is a case in programming?", answers: ["camelCase", "upperCase", "lowerCase", "bonusCase", "None of the above"], correctAnswer: "camelCase"},
    {question: "Who is the incumbent president of America?", answers: ["Bush", "Biden", "Trump", "Obama", "None of the above"], correctAnswer: "Biden"}
];

//call this function to start the quiz
showMsg("start");
let quiz;
const questionDisplay = document.getElementById("question-display");
const answersDisplay = document.getElementsByClassName("answer-area")[0];
const currentQNumDisplay = document.getElementById("current-q-num");
const totalQNumDisplay = document.getElementById("total-q-num"); 
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score"); 
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

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


previousBtn.addEventListener("click", (e) => {
    quiz.previousQuestion();
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");
    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.totalQuestions();
});

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