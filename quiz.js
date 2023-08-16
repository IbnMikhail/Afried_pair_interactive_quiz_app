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
    
    this.totalQuestions = () => this.questionsAndAnswersBank.length;

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

    this.timeReducer = () => {
        if (this.time > 0) {
            this.time -= 1;
        }
    }

    //call this to mark the current question
    this.markCurrentQuestion = function(){
        if (!this.markedQindices.includes(this.currentQindex)) {
            this.markedQindices.push(this.currentQindex);
        }
    }

    this.markPreviousQuestion = function(){
        if (this.currentQindex > 0 && !this.markedQindices.includes(this.currentQindex - 1)) {
            this.markedQindices.push(this.currentQindex - 1);
        }
    }

    this.isCompletelyMarked = () => this.markedQindices.length == this.questionsAndAnswersBank.length;
}

export default Quiz;
