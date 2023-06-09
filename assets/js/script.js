//getting all required elemets
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const user_box = document.querySelector(".user_box");
const create_user = document.getElementById("login_form-submit");
const skip_btn = document.querySelector(".skip");
const continue_btn = document.querySelector(".buttons .continue");
const quit_btn = document.querySelector(".buttons .exit");
const restart_btn = document.querySelector(".buttons .restart");
const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_text");
const timeCount = document.querySelector(".timer .timer_sec");

// If Start Quiz Button Clicked
start_btn.onclick = ()=>{
    user_box.classList.add("activeUser"); // show the info box
}

// If create user buttonC licked
create_user.onclick = ()=>{
    info_box.classList.add("activeInfo"); // show the info box
    user_box.classList.remove("activeUser"); //hide the user box
}

// If skip button Clicked
skip_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // show the info box
    user_box.classList.remove("activeUser"); //hide the user box
}

// If Exit Button Clicked
quit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
}

// If continue Button Clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0); //show the questions
    queCounter(1); //setting counter to 1
    startTimer(15);
    startTimerLine(0);
}

// values for timer and scores
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// required elemants for next button and question counter in the footer
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


//if try again button is clicked
const restart_quiz = result_box.querySelector(".buttons .restart");
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// If quit button is clicked
quit_btn.onclick = ()=>{
    window.location.reload();
}

const quit_quiz = result_box.querySelector(".buttons .quit");
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

// if next button is clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if the question count is less than total questions availiable
        que_count++; //set the question counter value
        que_numb++; //set the question number to the next value
        showQuestions(que_count); //showing questions
        queCounter(que_numb); //clear counter
        clearInterval(counter); //clear value in counter
        clearInterval(counterLine); //clear counterline
        startTimer(timeValue); // start timer function
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine);
        showResult(); //show result function
    }
}

//getting questions and options from array
function showQuestions(index){
    //replacing the question and options span and div for values ussing array index
    let que_tag = '<span>'+ questions[index].numb +". "+ questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    //set click attribute to all availiable options
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// showing icons for options
let tickIconTag = '<div class="icon_tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon_cross"><i class="fas fa-times"></i></div>';

// when option is clicked
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterline
    let userAns = answer.textContent; //getting user selected answer
    let correctAns = questions[que_count].answer; //checking against correct answer
    const allOptions = option_list.children.length; //getting all option items

    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("wrong Answer");

        // if selected answer is wrong, then show the right answer
        for (let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.")
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 4){
        let scoreTag = '<span> Well done! You got <p>' + userScore + '<p> out of </p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else{
        let scoreTag = '<span> Try again! You got <p>' + userScore + '<p> out of </p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time's up!"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correctAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index + '</p> of <p>' + questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}