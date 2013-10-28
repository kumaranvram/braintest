var questions;
var randomizedQuestionIndices;
var currentIndex;
var currentQuestion;
var score;
var controller;
var paused = true;
var gameOver = false;

$(document).ready(function() {
	
	initializeLeapMotion();
	hookEventsForAnswers();
	
	questions = loadJSON();

	if(questions) {
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
	score = 0;
	currentIndex = 0;
	gameOver = false;
	paused = false;
	randomizedQuestionIndices = randomizeQuestions(questions.length);
	currentQuestion = questions[randomizedQuestionIndices[currentIndex]]
	setCurrentQuestionAndAnswerContents();
}

var nextQuestion = function() {
	currentIndex++;
	if(currentIndex >= questions.length && !gameOver) {
		alert("Game over");
		gameOver = true;
		return;
	}

	setTimeout(function() {
		currentQuestion = questions[randomizedQuestionIndices[currentIndex]]
		setCurrentQuestionAndAnswerContents();
		paused = false;
	}, 500);
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
	if(currentQuestion.answerLeft.answer === "true" && !gameOver) {
		score++;
		updateScore();
	}
	nextQuestion();
}

var answerRightClicked = function() {
	console.log("right Div clicked");
	if(currentQuestion.answerRight.answer === "true" && !gameOver) {
		score++;
		updateScore();
	}	
	nextQuestion();
}

var updateScore = function () {
	$('#score').text('Your score is: ' + score + '/' + questions.length);
}

var initializeLeapMotion = function() {
	controller = new Leap.Controller({enableGestures: true});

	controller.on('gesture', function (gesture){
	    if(gesture.type === 'swipe'){
	        handleSwipe(gesture);
	    }
	});

	controller.connect();
}

var hookEventsForAnswers = function (){ 
	$('#answerLeft').click(function() {
		answerLeftClicked();
	});

	$('#answerRight').click(function() {
		answerRightClicked();
	});
}

var handleSwipe = function (swipe) {
    var startFrameID;
    if(swipe.state === 'stop' && !paused) {
        if (isRightSwipe(swipe)){            
            console.log("Swipe right" + new Date().getTime());            
            paused = true;
            answerRightClicked();

        }
        else {
     	   console.log("Swipe left" + new Date().getTime());
        	controller.connection.gesturesEnabled = false;
        	paused = true;
        	answerLeftClicked();              
	    }
    }	
}

function countdownComplete(){
	alert("yo");
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

var isRightSwipe = function (swipe) {
	return swipe.direction[0] > 0;
}