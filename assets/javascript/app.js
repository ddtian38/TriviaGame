//Creating quiz object where questions, and answers are stored
var quiz = {    length: 7,
    q1:          { question: "Which passage is this verse from: \"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life\"",
                  answers: ["John 3:16", "Roman 8:28", "Genesis  1:1", "Revelation 8:20"],
                  correct: "John 3:16"
                },
    q2:         {   question: "Which of the following is not one of the twelve tribes of Israel?",
                    answers: ["Dan", "Levi", "Benjamin", "Ammonites"],
                    correct: "Ammonites"
                },
    q3:         {   question: "What was Israel's other name?",
                    answers: ["Esul", "Jacob", "Abraham", "Adam"],
                    correct: "Jacob"
                },
    q4:         {   question: "Matthew was a _________. ",
                    answers: ["Tax Collector", "Roman Centurion", "Prophet", "Gentile"],
                     correct: "Tax Collector"
                },
    q5:        { question: "To what city was Saul traveling when he encountered a great and blinding light?",
                    answers:["Rome", "Damascus", "Jerusalum", "Athens"],
                    correct: "Damascus"
                },

    q6:         { question: "Who is Stephen in Acts of the Apostles?",
                  answers: ["The first Christian martyr", "The first Christian disciple", "The first disciple to abandon Jesus", "The author of the Book of Stephen"],
                  correct:"The first Christian martyr"
                },
    q7:         {question: "Who is the first apostle to deny Jesus?",
                answers: ["Mark", "Judas", "John", "Peter"],
                correct: "Peter"

                }

};
//Declaring and initlizing global variables
var qNum = 1;
var quizContent = $(".quiz-content");
var second, timerElement, question, answers, choices, answerIsCorrect, timeIsOut, intervalId, right = 0, wrong = 0, unanswered = 0;

function countDown(){
    seconds--;
    console.log(seconds);
    timerElement.text("Time Remaining: " + seconds + " seconds.");
    if(seconds === 0){
        timeIsOut = true;
        displayAfterAnswer(false, timeIsOut);
    }
}

//Function adds questions after the user has press start and also answer questions
function addQuestion() {
    seconds = 30;

    if(qNum > quiz.length){
       displayFinalResult();
       return;
    }

    timerElement = $("<p id=\"timer\">").text("Time Remaining: " + seconds + " seconds.");//timerElement = document.createElement("p");
    // var textNode = document.createTextNode("Time Remaining: " + seconds + " seconds.");
    // timerElement.setAttribute("id", "timer");
    // timerElement.appendChild(textNode);
    quizContent.append(timerElement);

    //Creating question HTML elements
    // question = document.createElement("p");
    // textNode = document.createTextNode(quiz["q"+qNum].question);
    // question.setAttribute("id", "question");
    // question.appendChild(textNode);
    question = $("<p id=\"question\">").text(quiz["q"+qNum].question)
    quizContent.append(question);

    //Creating answer HTML elements. Assigns answer choices in the ul element
    // answers = document.createElement("ul");
    // answers.setAttribute("id", "answerChoices");
    answers = $("<ul id = \"answerChoices\">")

    for (var i = 0; i < quiz["q"+qNum].answers.length; i++){
        // var a = document.createElement("li");
        // textNode = document.createTextNode(quiz["q"+qNum].answers[i]);
        // a.setAttribute("class", "answer");
        // a.appendChild(textNode);
        // answers.appendChild(a);
        var a = $("<li>").addClass("answer").text(quiz["q"+qNum].answers[i]);
        answers.append(a);
    }
    // quizContent.appendChild(answers);
    // choices = document.querySelectorAll(".answer");
    quizContent.append(answers);
    choices = $(".answer");

    //Start counting down the seconds
    intervalId = setInterval(countDown, 1000);
    
    //Event listener waits for user to select an answer.
    // for(var i = 0; i < choices.length; i++){
    //         choices[i].addEventListener("click", function(){
    //         answerIsCorrect = checkAnswerIsCorrect(this.textContent);
    //         displayAfterAnswer(answerIsCorrect)        
    //        })
    //  }
}

$(document).on("click", ".answer", function(){
    answerIsCorrect = checkAnswerIsCorrect($(this).text());
    displayAfterAnswer(answerIsCorrect)
})



//Checks if the answers is correct
function checkAnswerIsCorrect(choice){
    return  choice === quiz["q"+qNum].correct;
}

//Function displays if the user has answered the question correctly, incorrectly, or not at all. Takes two argument: "a" is a boolean checking if the user answered the question correctly and "t" is boolean if the user has run out of time.
function displayAfterAnswer(a, t = false){

    //Clearing the count down function to prevent calling the countDown() twice.
    clearInterval(intervalId);

    //Creating status to notify the user if he has answered correct or incorrectly.
    // var status = document.createElement("p");
    // status.setAttribute("id", "status")
    // var statusText;
    // document.getElementById("question").remove();
    // document.querySelector("#answerChoices").remove();
    var status = $("<p id=\"status\">");
    var statusText;
    $("#question").remove();
    $("#answerChoices").remove();


    //If the user answered correctly.
    if (a){
        statusText = "Correct!";
        right++;    
    }
    //If the user answered incorrectly.
    else{
            //If the user has run out of time
        if(t){
            statusText = "Out of time. \n The correct answer is " + quiz["q"+qNum].correct + ".";   
            unanswered++;   
            console.log("adding unanswered")
        }
         //If the user did not run out of time
        else{
            statusText = "Incorrect! \n The correct answer is " + quiz["q"+qNum].correct + ".";
            wrong++;
            console.log("adding wrong")
        }
    }

    status.text(statusText);
    quizContent.append(status);
    qNum++;

    //After five seconds, the next question will be added
    setTimeout(function(){
        $("#timer").remove();
        $("#status").remove();
        addQuestion();
    }, 5000);
}

//Function displays final retuls
function displayFinalResult(){
    // var resultTitle = document.createElement("h4");
    // resultTitle.setAttribute("id", "result-title");
    // var resultTitleText = document.createTextNode("Well Done! Here's are your result.");
    // resultTitle.appendChild(resultTitleText);
    var resultTitle = $("<h4 id=\"result-title\">").text("Well Done! Here's are your result.")

    // var winResults = document.createElement("p");
    // winResults.setAttribute("id", "wins");
    // var winResultsText = document.createTextNode("Correct: " + right);
    // winResults.appendChild(winResultsText);

    var winResults = $("<p id=\"wins\">").text("Correct: " + right)

    // var lossResults = document.createElement("p");
    // lossResults.setAttribute("id", "losses");
    // var lossResultsText = document.createTextNode("Incorrect: " + wrong);
    // lossResults.appendChild(lossResultsText);

    var lossResults = $("<p id=\"losses\">").text("Incorrect: " + wrong);


    // var unansweredResults = document.createElement("p");
    // unansweredResults.setAttribute("id", "unanswered");
    // var unansweredResultsText = document.createTextNode("Unanswered: " + unanswered);
    // unansweredResults.appendChild(unansweredResultsText);

    var unansweredResults = $("<p id=\"unanswered\">").text("Unanswered: " + unanswered);

    // var startOverButton = document.createElement("button");
    // startOverButton.setAttribute("class", "btn btn-dark");
    // startOverButton.setAttribute("id", "restart")
    // var startOverButtonText = document.createTextNode("Start Over?");
    // startOverButton.appendChild(startOverButtonText);

    var startOverButton = $("<button id=\"restart\">").addClass("btn").addClass("btn-dark").text("Start Over");

    var resultElements = [resultTitle, winResults, lossResults, unansweredResults, startOverButton];
    for (var i in resultElements){
        quizContent.append(resultElements[i]);
    }

    //Restart button is created.
//    document.querySelector("#restart").addEventListener("click", reset);
   $(document).on("click", "#restart", function(){
    var resultContentsId = ["result-title", "wins", "losses", "unanswered", "restart"];
    for (var ele in resultContentsId){
        $("#"+resultContentsId[ele]).remove();
    }

    right = 0;
    wrong = 0;
    unanswered = 0;
    seconds = 30;
    qNum = 1;
    addQuestion();

   })

}

//Reset function to start the quiz over
// function reset(){
//     var resultContentsId = ["result-title", "wins", "losses", "unanswered", "restart"];
//     for (var ele in resultContentsId){
//         document.querySelector("#"+resultContentsId[ele]).remove();
//     }

//     right = 0;
//     wrong = 0;
//     unanswered = 0;
//     seconds = 30;
//     qNum = 1;
//     addQuestion();

// }

//Start of main program
$(document).ready(function(){

    $(".btn").on("click", function(){
        $(this).remove();
        addQuestion();
    
    })


})

