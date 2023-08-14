function showMsg(typeId) {
    document.getElementById(typeId).style.display = "block";
}

function closeMsg(typeId) {
    document.getElementById(typeId).style.animation = "fadeOut 2s linear 1";
    document.getElementById(typeId).style.display = "none";
}

/**
 * 
 * @param {object} questionsAndAnswersBank - The object of the questions and their array answers e.g
 * [
 * {question: "Where is nigeria?", answers: ["Africa", "North America", "South America", "Asia", "None of the above"],correctAnswer : "Africa"},
 * {question: "Who is the president of Nigeria?", answers: ["Atiku", "Buhari", "Obasanjo", "Shagari", "None of the above"],correctAnswer : "None of the above"},
 * {question: "How many continents do we have?", answers: ["12", "5", "11", "Asia", "6"], correctAnswer: "6"}
 * {question: "Which of these is a case in programming?", answers: ["camelCase", "upperCase", "lowerCase", "bonusCase", "None of the above"],correctAnswer : "camelCase"}
 * {question: "Who is the president of America?", answers: ["Bush", "Biden", "Trump", "Obama", "None of the above"], correctAnswer : "Biden"}
 * ]
 */
function Quiz(questionsAndAnswersBank){
    this.currentQindex = 0;
    this.questionsAndAnswersBank = questionsAndAnswersBank;
    this.question = this.questionsAndAnswersBank[this.currentQindex].question;
    this.answers = this.questionsAndAnswersBank[this.currentQindex].answers;
    this.correctAnswer = this.questionsAndAnswersBank[this.currentQindex].correctAnswer;
    this.time = 1;
    this.score = 0;
    this.markedQindices = [];

    this.start = () => {
        new Quiz(questionsAndAnswersBank);
    }

    this.restart = () => {
        this.start();
    }
    
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

    this.markQuestion = function(){
        if (!this.markedQindices.find((index) => index == this.currentQindex)) {
            this.markedQindices.push(this.currentQindex);
        }
    }

}

let questionsAndAnswersBank =    [
    {question: "Where is nigeria?", answers: ["Africa", "North America", "South America", "Asia", "None of the above"], correctAnswer: "Africa"},
    {question: "Who is the president of Nigeria?", answers: ["Atiku", "Buhari", "Obasanjo", "Shagari", "None of the above"], correctAnswer: "None of the above"},
    {question: "How many continents do we have?", answers: ["12", "5", "11", "9", "6"], correctAnswer: "6"},
    {question: "Which of these is a case in programming?", answers: ["camelCase", "upperCase", "lowerCase", "bonusCase", "None of the above"], correctAnswer: "camelCase"},
    {question: "Who is the president of America?", answers: ["Bush", "Biden", "Trump", "Obama", "None of the above"], correctAnswer: "Biden"}
]

//call this function to start the quiz
showMsg("start");
let quiz;
let questionDisplay = document.getElementById("question-display");
let answersDisplay = document.getElementsByClassName("answer-area")[0];
let currentQNumDisplay = document.getElementById("current-q-num");
let totalQNumDisplay = document.getElementById("total-q-num"); 
let timerDisplay = document.getElementById("timer"); 
let timingId;

function startQuiz(){
    quiz = new Quiz(questionsAndAnswersBank);
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");
    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.questionsAndAnswersBank.length;

    startTimer();

}

function startTimer(){
    if (quiz.markedQindices.length == quiz.questionsAndAnswersBank) {
        showMsg('congrats');
        return;
    }

    if (!quiz.markedQindices.find((index) => index == quiz.currentQindex)) {
        timingId = setInterval(() => {
            quiz.timer();
            timerDisplay.innerHTML = quiz.time + " Seconds";
    
            if (quiz.time == 0) {
                quiz.markQuestion();
                //mark the script
                clearInterval(timingId);
            }
        }, 1000);
    }
}

let previousBtn = document.getElementById("previous-btn");
let nextBtn = document.getElementById("next-btn");

previousBtn.addEventListener("click", (e) => {
    quiz.previousQuestion();
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");
    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.questionsAndAnswersBank.length;
    startTimer();
});

nextBtn.addEventListener("click", (e) => {
    quiz.nextQuestion();
    questionDisplay.innerHTML = quiz.question;
    answersDisplay.innerHTML = quiz.answers.map((answer) => "<button>" + answer + "</button>");

    currentQNumDisplay.innerHTML = quiz.currentQindex + 1;
    totalQNumDisplay.innerHTML = quiz.questionsAndAnswersBank.length;
    startTimer();

    console.log(quiz.score);
});

answersDisplay.addEventListener("click", (event) => {
    let choosen = event.target.innerText;

    if (!quiz.markedQindices.find((index) => index == quiz.currentQindex)) {

        if (quiz.time > 0) {
            if (choosen == quiz.correctAnswer) {
                quiz.markQuestion();
                quiz.score += 1;
                showMsg('correct');
                
            } else{
                quiz.markQuestion();
                showMsg('incorrect');
            }
        } else{
            showMsg('timeout');
        }
    } else{
        showMsg('congrats');
    }
});