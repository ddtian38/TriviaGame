var quiz = {    length: 3,
                q1: { question: "Who executed order 66?",
                  answers: ["Palpatine", "Commander Cody", "Anakin Skywalker", "Yoda"],
                  correct: "Palpatine"
                },
    q2:         { question: "Who was the first regimental leader of the 501st Legion?",
                    answers: ["Captain Rex", "Anakin SkyWalker", "Commander Appo", "Captain Wolf"],
                    correct: "Captain Rex"
                },
    q3:         { question: "Who denied Anakin the rank of Jedi Master?",
                    answers: ["Obi-Wan", "Eeth Koth", "Mace Windu", "Shaak Ti"],
                    correct: "Mace Windu"
                }
};

var qNum = 1;
var quizContent = document.querySelector(".quiz-content");
var second, timerElement, question, answers, choices, answerIsCorrect, timeIsOut, intervalId, right = 0, wrong = 0, unanswered = 0;

function countDown(){
    seconds--;
    console.log(seconds);
    timerElement.textContent = "Time Remaining: " + seconds + " seconds.";
    if(seconds === 0){
        timeIsOut = true;
        console.log("in count down");
        displayAfterAnswer(false, timeIsOut);
    }
}

function addQuestion() {
    seconds = 30;

    if(qNum > quiz.length){
       displayFinalResult();
       return;
    }

    timerElement = document.createElement("p");
    var textNode = document.createTextNode("Time Remaining: " + seconds + " seconds.");
    timerElement.setAttribute("id", "timer");
    timerElement.appendChild(textNode);
    quizContent.appendChild(timerElement);

    //Creating question HTML elements
    question = document.createElement("p");
    textNode = document.createTextNode(quiz["q"+qNum].question);
    question.setAttribute("id", "question");
    question.appendChild(textNode);
    quizContent.appendChild(question);

    //Creating answer HTML elements. Assigns answer choices in the ul element
    answers = document.createElement("ul");
    answers.setAttribute("id", "answerChoices");

    for (var i = 0; i < quiz["q"+qNum].answers.length; i++){
        var a = document.createElement("li");
        textNode = document.createTextNode(quiz["q"+qNum].answers[i]);
        a.setAttribute("class", "answer");
        a.appendChild(textNode);
        answers.appendChild(a);
    }
    quizContent.appendChild(answers);
    choices = document.querySelectorAll(".answer");

    intervalId = setInterval(countDown, 1000);
    
    for(var i = 0; i < choices.length; i++){
            choices[i].addEventListener("click", function(){

            console.log("User has selected a choice.");
            answerIsCorrect = checkAnswerIsCorrect(this.textContent);
            displayAfterAnswer(answerIsCorrect)        
           })
     }
}


function checkAnswerIsCorrect(choice){
    return  choice === quiz["q"+qNum].correct;
}

function displayAfterAnswer(a, t = false){

    clearInterval(intervalId);

    var status = document.createElement("p");
    status.setAttribute("id", "status")
    var statusText;
    document.getElementById("question").remove();
    document.querySelector("#answerChoices").remove();

    if (a){
        statusText = document.createTextNode("Correct!");
        right++;    
    }
    else{
        if(t){
            statusText = document.createTextNode("Out of time. \n The correct answer is " + quiz["q"+qNum].correct + ".");   
            unanswered++;   
            console.log("adding unanswered")
        }
        else{
            statusText = document.createTextNode("Incorrect! \n The correct answer is " + quiz["q"+qNum].correct + ".");
            wrong++;
            console.log("adding wrong")
        }
    }

    status.appendChild(statusText);
    quizContent.appendChild(status);
    qNum++;

    setTimeout(function(){
        document.querySelector("#timer").remove();
        document.querySelector("#status").remove();
        addQuestion();
    }, 5000);
}

function displayFinalResult(){
    var resultTitle = document.createElement("h4");
    resultTitle.setAttribute("id", "result-title");
    var resultTitleText = document.createTextNode("Well Done! Here's are your result.");
    resultTitle.appendChild(resultTitleText);

    var winResults = document.createElement("p");
    winResults.setAttribute("id", "wins");
    var winResultsText = document.createTextNode("Wins: " + right);
    winResults.appendChild(winResultsText);

    var lossResults = document.createElement("p");
    lossResults.setAttribute("id", "losses");
    var lossResultsText = document.createTextNode("Losses: " + wrong);
    lossResults.appendChild(lossResultsText);

    var unansweredResults = document.createElement("p");
    unansweredResults.setAttribute("id", "unanswered");
    var unansweredResultsText = document.createTextNode("Unanswered: " + wrong);
    unansweredResults.appendChild(unansweredResultsText);

    var startOverButton = document.createElement("button");

    startOverButtonAttr = [".btn", ".btn-dark"];
    for (var ele in startOverButtonAttr){
        startOverButton.setAttribute("class", startOverButtonAttr[ele])
    }

    startOverButton.setAttribute("id", "restart")
    var startOverButtonText = document.createTextNode("Start Over?");
    startOverButton.appendChild(startOverButtonText);

    var resultElements = [resultTitle, winResults, lossResults, unansweredResults, startOverButton];
    for (var i in resultElements){
        quizContent.appendChild(resultElements[i]);
    }
    
    // quizContent.appendChild(resultTitle);
    // quizContent.appendChild(winResults);
    // quizContent.appendChild(lossResults);
    // quizContent.appendChild(unansweredResults);
    // quizContent.appendChild(startOverButton);

   document.querySelector("#restart").addEventListener("click", reset)

}

function reset(){
        
    var resultContentsId = ["result-title", "wins", "losses", "unanswered", "restart"];
    for (var ele in resultContentsId){
        document.querySelector("#"+resultContentsId[ele]).remove();
    }

    right = 0;
    wrong = 0;
    unanswered = 0;
    seconds = 30;
    qNum = 1;
    addQuestion();
}







//Start of main program
document.querySelector(".btn").addEventListener("click", function(){
    quizContent.removeChild(document.querySelector(".btn"));
    addQuestion();

})
