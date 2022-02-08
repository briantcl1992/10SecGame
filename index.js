console.log("I brought my gears")

$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    var high_score = 0;
    var number_limit = 10;

    var updateTimeLeft = function(amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    var updateScore = function(amount) {
        score += amount;
        $('#score').text(score);
    }

    var startGame = function() {
        if(!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                if (score > high_score) {
                    high_score = score;
                    $('#high-score').text(high_score);
                }
                updateScore(-score);
            }
            interval = setInterval(function(){
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    }

    var updateNumberLimit = function(limit){
        //console.log(number_limit);
        //console.log(limit);
        number_limit = limit;
        //console.log(number_limit);
        $('#no_lm').text(number_limit);
    }
    
    

    var randomNumberGenerator = function(size){
        return Math.ceil(Math.random() * size);
    }
    
    var questionGenerator = function() {
        var question = {};
        var num1 = randomNumberGenerator(number_limit);
        var num2 = randomNumberGenerator(number_limit);
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
        return question;
    }

    var renderNewQuestion = function() {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }



    var checkAnswer = function(userInput, answer){
        if (userInput == answer) {
            renderNewQuestion()
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    }

    $('#user-input').on('keyup',function(){
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    $('#number-limit').on('change', function(){
        //console.log("change is made");
        limit = Number($(this).val());
        //console.log(limit);
        updateNumberLimit(limit);
        renderNewQuestion();
    })

    renderNewQuestion();

})
