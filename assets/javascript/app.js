var quiz = {q1: { question: "Who executed order 66?",
                  answers: ["Palaptine", "Commander Cody", "Anakin Skywalker", "Yoda"],
                  correct: 0
                },
    q2:         { question: "Who executed order 66?",
                    answers: ["Palaptine", "Commander Cody", "Anakin Skywalker", "Yoda"],
                    correct: 0
                },
    q3:         { question: "Who executed order 66?",
                    answers: ["Palaptine", "Commander Cody", "Anakin Skywalker", "Yoda"],
                    correct: 0
                }
};

var seconds = 30;
var qNum = 1;
var quizContent = document.querySelector(".quiz-content");
var timerElement, question, answers, choices;



function countDown(){
    seconds--;
    timerElement.textContent = seconds;

}


function addQuestion() {

    

    timerElement = document.createElement("p");
    var textNode = document.createTextNode("Time Remaining: " + seconds + " seconds.");
    timerElement.setAttribute("id", "timer");
    timerElement.appendChild(textNode);
    quizContent.appendChild(timerElement);

    // intervalId = setInterval(countDown, 1000);

    question = document.createElement("p");
    textNode = document.createTextNode(quiz["q"+qNum].question);
    question.setAttribute("id", "question");
    question.appendChild(textNode);
    quizContent.appendChild(question);

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
    qNum++;

    
    for(var i = 0; i < choices.length; i++){
    
            choices[i].addEventListener("click", function(){
            console.log(this.textContent);
            var choice = this.textContent;
            console.log(checkAnswer(choice));
    
        })
    
    }

}


function checkAnswer(choice){

    return  (quiz["q" + qNum].correct === quiz["q" + qNum].answers.indexOf(choice));

}

//Start of main program
document.querySelector(".btn").addEventListener("click", function(){
    quizContent.removeChild(document.querySelector(".btn"));
    addQuestion();

});



