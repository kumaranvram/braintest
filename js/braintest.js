var questions;
var randomizedQuestionIndices;
var currentIndex;
var currentQuestion;
var score;

$(document).ready(function() {
	$('#answerLeft').click(function() {
		answerLeftClicked();
	});

	$('#answerRight').click(function() {
		answerRightClicked();
	});

	score = 0;
	currentIndex = 0;
	questions = loadJSON();
	if(questions) {
		randomizedQuestionIndices = randomizeQuestions(questions.length);
		currentQuestion = questions[randomizedQuestionIndices[currentIndex]]
		startGame();
	}
});	

var randomizeQuestions = function (length) {
	var originalIndices = [];
	for (var i = 0; i < length; i++) {
		originalIndices.push(i);
	};
	randomIndices = originalIndices.sort(function() {
	  return .5 - Math.random();
	});
	return randomIndices;
}

var startGame = function() {
	setCurrentQuestionAndAnswerContents();
}

var nextQuestion = function() {
	console.log("Old currentIndex: " + currentIndex)
	currentIndex++;
	console.log("Old currentIndex: " + currentIndex)
	if(currentIndex >= questions.length) {
		alert("Game over");
		return;
	}
	currentQuestion = questions[randomizedQuestionIndices[currentIndex]]
	setCurrentQuestionAndAnswerContents();
}

var setCurrentQuestionAndAnswerContents = function() {
	$('#question').empty();
	if(currentQuestion.question.text) {		
		$('#question').text( currentQuestion.question.text);
	} else {
		$('#question').prepend('<img id="questionImage" src="../images/"'+ currentQuestion.question.image +'" />');
	}

	if(currentQuestion.answerLeft.text) {		
		$('#answerLeft').text( currentQuestion.answerLeft.text);
	} else {
		$('#answerLeft').prepend('<img id="answerLeftImage" src="../images/"'+ currentQuestion.answerLeft.image +'" />');
	}

	if(currentQuestion.answerRight.text) {		
		$('#answerRight').text( currentQuestion.answerRight.text);
	} else {
		$('#answerRight').prepend('<img id="answerRightImage" src="../images/"'+ currentQuestion.answerRight.image +'" />');
	}
}

var answerLeftClicked  = function() {
	console.log("Left div clicked");
	if(currentQuestion.answerLeft.answer === "true") {
		score++;
	}
	updateScore();
	nextQuestion();
}

var answerRightClicked = function() {
	console.log("right Div clicked");
	if(currentQuestion.answerRight.answer === "true") {
		score++;
	}	
	updateScore();
	nextQuestion();
}

var updateScore = function () {
	$('#score').text('Your score is: ' + score + '/' + questions.length);
}

var loadJSON = function() {
    return [
		{
			"question": {
				"text": "2 + 2 ="
			},
			"answerLeft": {
				"text": "3"
			},
			"answerRight": {
				"text": "4",
				"answer": "true"
			},
			"timeout": "5",
		},
		{
			"question": {
				"text": "how much wood can a wood chucker chuck if a wood chucker can chuck wood?"
			},
			"answerLeft": {
				"text": "I have no clue",
				"answer": "true"
			},
			"answerRight": {
				"text": "4",
			},
			"timeout": "10",
		},
		{
			"question": {
				"text": "2 + 3 ="
			},
			"answerLeft": {
				"text": "2"
			},
			"answerRight": {
				"text": "5",
				"answer": "true"
			},
			"timeout": "5",
		}
	];
}

function countdownComplete(){
	alert("yo");
}