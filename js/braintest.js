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
	hookEvents();
	
	questions = loadJSON();

	if(questions) {
		startGame();
	}
});	

var randomizeQuestions = function () {
	var originalIndices = [];
	for (var i = 0; i < questions.length; i++) {
		originalIndices.push(i);
	};
	randomIndices = originalIndices.sort(function() {
	  return .5 - Math.random();
	});
	randomIndices = randomIndices.slice(0, 7);
	return randomIndices;
}

var startGame = function() {
	score = 0;
	currentIndex = 0;
	gameOver = false;
	paused = false;
	randomizedQuestionIndices = randomizeQuestions();
	currentQuestion = questions[randomizedQuestionIndices[currentIndex]]
	setCurrentQuestionAndAnswerContents();
}

var nextQuestion = function() {
	currentIndex++;
	if(currentIndex >= randomIndices.length && !gameOver) {
		alert("Game over");
		gameOver = true;
		$('.answer').removeClass('highlight');
		return;
	}

	setTimeout(function() {
		$('.answer').removeClass('highlight');
		currentQuestion = questions[randomizedQuestionIndices[currentIndex]]
		setCurrentQuestionAndAnswerContents();
		paused = false;
	}, 500);
}

var setCurrentQuestionAndAnswerContents = function() {
	$('#question').empty();
	$('#answerLeft').empty();
	$('#answerRight').empty();
	
	$('#question').prepend (currentQuestion.question.text);
	$('#answerLeft').prepend (currentQuestion.answerLeft.text);
	$('#answerRight').prepend (currentQuestion.answerRight.text);

}

var answerLeftClicked  = function() {
	console.log("Left div clicked"); 
	if(currentQuestion.answerLeft.answer === "true" && !gameOver) {
		score++;
		updateScore(true);
	}
	else {
		updateScore(false);
	}
	nextQuestion();
}

var answerRightClicked = function() {    
	if(currentQuestion.answerRight.answer === "true" && !gameOver) {
		score++;
		updateScore(true);
	} else {
		updateScore(false);
	}
	nextQuestion(); 
}

var updateScore = function (isRightAnswer) {
	if(isRightAnswer === true) {
		$('#score li:nth-child('+ (currentIndex + 1) + ')').addClass('green');
	} else {
		$('#score li:nth-child('+ (currentIndex + 1) + ')').addClass('red');
	}
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

var hookEvents = function (){ 
	$('#answerLeft').click(function() {
		answerLeftClicked();
	});

	$('#answerRight').click(function() {
		answerRightClicked();
	});

	$('#resetGame').click(function() {
		location.reload();
	});	
}

var handleSwipe = function (swipe) {
    var startFrameID;
    if(swipe.state === 'stop' && !paused) {
        if (isRightSwipe(swipe)){            
            paused = true;
            highlight('#answerRight');
            answerRightClicked();
        }
        else {
     	   console.log("Swipe left" + new Date().getTime());
        	paused = true;
            highlight('#answerLeft');
        	answerLeftClicked();              
	    }
    }	
}

var highlight = function(e) {
	$(e).addClass('highlight');
} 


var isRightSwipe = function (swipe) {
	return swipe.direction[0] > 0;
}

var loadJSON = function() {
    return [
		{
			"question": {
				"text": "2 + 2 = "
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
				"text": "<strong>I have no clue</strong>",
				"answer": "true"
			},
			"answerRight": {
				"text": "4",
			},
			"timeout": "10",
		},
		{
			"question": {
				"text": "2 + 3 = "
			},
			"answerLeft": {
				"text": "2"
			},
			"answerRight": {
				"text": "5",
				"answer": "true"
			},
			"timeout": "5",
		},
		{
		"question": {
			"text": "Before Mt. Everest was discovered, what was the highest mountain in the world?"
		},
		"answerLeft": {
			"text": "Mt. K2"
		},
		"answerRight": {
			"text": "Mt. Everest",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "Which is correct to say, 'The yolk of the egg is white' or 'The yolk of the egg are white?'"
		},
		"answerLeft": {
			"text": "Both"
		},
		"answerRight": {
			"text": "Neither",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "A farmer has five haystacks in one field and four haystacks in another. How many haystacks would he have if he combined them all in one field?"
		},
		"answerLeft": {
			"text": "One",
			"answer": "true"
		},
		"answerRight": {
			"text": "Nine"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "A bottle of juice cost  Rs 10. The juice was worth Rs 9 more than the bottle.How much was the bottle worth?"
		},
		"answerLeft": {
			"text": "1 rupee"
		},
		"answerRight": {
			"text": "0.50 rupees",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "There is a house with four walls. Each wall faces south. There is a window in each wall.A bear walks by one of the windows. What colour is the bear?"
		},
		"answerLeft": {
			"text": "Brown"
		},
		"answerRight": {
			"text": "White",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "Some months have 31 days; how many have 28?"
		},
		"answerLeft": {
			"text": "One"
		},
		"answerRight": {
			"text": "All",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "In the 1750's, was it legal for a man in India to marry his widow's sister?"
		},
		"answerLeft": {
			"text": "Yes"
		},
		"answerRight": {
			"text": "No",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "Divide 30 by 1/2 and add 10. What is the answer?"
		},
		"answerLeft": {
			"text": "70",
			"answer": "true"
		},
		"answerRight": {
			"text": "25"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "An electric train is going 40 mph north, the wind is blowing 60 mph south. Which way is the train's smoke blowing?"
		},
		"answerLeft": {
			"text": "I have no idea",
			"answer": "true"
		},
		"answerRight": {
			"text": "North"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "A farmer has 17 sheep, and all but 9 die. How many are left?"
		},
		"answerLeft": {
			"text": "8"
		},
		"answerRight": {
			"text": "9",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "Now that the Soviet Union has broken up, what is the world's largest country by land area?"
		},
		"answerLeft": {
			"text": "Russia",
			"answer": "true"
		},
		"answerRight": {
			"text": "China"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "In what year did Christmas, and News Year's fall on the same day?"
		},
		"answerLeft": {
			"text": "Always",
			"answer": "true"
		},
		"answerRight": {
			"text": "None"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "What 9 letter English word is still a word each time you take away a letter?"
		},
		"answerLeft": {
			"text": "Startling",
			"answer": "true"
		},
		"answerRight": {
			"text": "Starting"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "How many times can you subtract the number 5 from 25?"
		},
		"answerLeft": {
			"text": "Five"
		},
		"answerRight": {
			"text": "One",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "At the end of a banquet 10 people shake hands with each other. How many handshakes will there be in total?"
		},
		"answerLeft": {
			"text": "50",
			"answer": "true"
		},
		"answerRight": {
			"text": "100"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "The day before the day before yesterday is three days after Saturday. What day is it today?"
		},
		"answerLeft": {
			"text": "Saturday"
		},
		"answerRight": {
			"text": "Friday",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "The word 'racecar' is spelled the same forwards and backwards."
		},
		"answerLeft": {
			"text": "True",
			"answer": "true"
		},
		"answerRight": {
			"text": "False"	
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "Mary's father had 5 children: <h2>Mimi, Mumu, Mama, Meme.</h2> What was the 5th child's name?"
		},
		"answerLeft": {
			"text": "Mini"
		},
		"answerRight": {
			"text": "Mary",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "A murderer is condemned to death. He has to choose between two rooms. The first is full of raging fires, second is full of lions that haven't eaten in 3 years. Which room is safest for him?"
		},
		"answerLeft": {
			"text": "First room"
		},
		"answerRight": {
			"text": "Second room",
			"answer": "true"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "Are 1990 Indian rupees worth more than 1989 Indian rupees?"
		},
		"answerLeft": {
			"text": "True",
			"answer": "true"
		},
		"answerRight": {
			"text": "False"
		},
		"timeout": "5",
	},
	{
		"question": {
			"text": "If it take 5 minutes to dry a t-shirt on a clothes wire, how long would it take to dry 5 t-shirts?"
		},
		"answerLeft": {
			"text": "5 minutes",
			"answer": "true"
		},
		"answerRight": {
			"text": "25 minutes"
		},
		"timeout": "5",
	}
	];
}


var countdownComplete= function (){
	currentQuestion = randomIndices.length;	
	alert('Well played! Your score is ' + score + '/' + randomIndices.length);
	location.reload();
}