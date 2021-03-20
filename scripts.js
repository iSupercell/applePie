// Overview of how it should work
// ---------------------------- //
// When user click on arrow left or right, it will change the text in the dialogue box
// On the 3rd dialogue text, user will be asked to choose between YES or NO
// The YES or NO option should be disabled at other times to avoid confusion
// Character's expression should change depending on the dialogue text
// The math question in the dialogue text will be generated randomly
// The generated numbers will appear in the equation visual
// Define and store user's input value to compare with the correct answer at each submit
// Character's expression and dialogue will change depending on the user's answer (RIGHT vs WRONG)
// Reroll button will reroll a new equation


// ---------------------------- //
// My codes starts below!!!

$(document).ready(function() {

    // Some variable to use later
    let counter = 0;
    let answerApple;
    let rerollCorrect;


    // RNG and Math functions to use later
    const generateApple = Math.floor(Math.random() * 10) + 1;
    const generatePie = Math.floor(Math.random() * 10) + 1;
    const correct = generateApple * generatePie;

    function newApple() {
        return Math.floor(Math.random() * 10) + 1;
    };
    function newPie() {
        return Math.floor(Math.random() * 10) + 1;
    };


    // Script for the dialogue box
    const charaConvo = {
        default: `To get started, just click on the > arrow next to me!`,
        convo0: `Hey there! I need to buy enough apples to make some apple pie for tonight's party.`,
        convo1: `Can you help me find out how many apples I need to get?`,
        convo2: `Awww! Don't be like that. Help a friend out!`,
        convo3: `Great! The receipe says that I need <span class="highlight">${generateApple} apple(s)</span> to make one apple pie. I have to make <span class="highlight">${generatePie} apple pie(s)</span> tonight so how many apples should I get?`,
        convo4: `Hmmm... Are you sure about that?`,
        convo5: `I see! Thanks for the help. I'll make sure to save you a slice!`
    };

    // Character images
    const charaImg = {
        img01: `<img src="./assets/char_01.png" alt="Picture of the character.">`,
        img02: `<img src="./assets/char_02.png" alt="Picture of the character.">`,
        img03: `<img src="./assets/char_03.png" alt="Picture of the character.">`,
        img04: `<img src="./assets/char_04.png" alt="Picture of the character.">`
    }


    // Default visual settings
    $('.ynbutton, .restart, .leftArrow, .applesNeeded, .pies').css('visibility', 'hidden');


    // Code for the dialogue box toggle
    $('.rightArrow').on('click', function(){
        counter++;
        if (counter == 1) {
            $('.leftArrow').css('visibility', '');
            $('.dialogueText').html(charaConvo.convo0);
        } else if (counter == 2) {
            $('.ynbutton').css('visibility', '');
            $('.rightArrow').css('visibility', 'hidden');
            $('.dialogueText').html(charaConvo.convo1);
        };
    });

    $('.leftArrow').on('click', function(){
        counter--;
        if (counter == 0) {
            $('.ynbutton, .leftArrow').css('visibility', 'hidden');
            $('.rightArrow').css('visibility', '');
            $('.dialogueText').html(charaConvo.default);
            $('.character').html(charaImg.img01);
        } else if (counter == 1) {
            $('.ynbutton').css('visibility', 'hidden');
            $('.leftArrow, .rightArrow').css('visibility', '');
            $('.dialogueText').html(charaConvo.convo0);
            $('.character').html(charaImg.img01);
        };
    });


    // Code for YES or NO button
    $('#y').on('click', function(){
        $('.ynbutton, .leftArrow').css('visibility', 'hidden');
        $('.restart, .applesNeeded, .pies').css('visibility', '');
        $('.dialogueText').html(charaConvo.convo3);
        $('.applesNeeded').html(generateApple);
        $('.pies').html(generatePie);
        $('.character').html(charaImg.img01);
    });

    $('#n').on('click', function(){
        $('.dialogueText').html(charaConvo.convo2);
        $('.character').html(charaImg.img02);
    });


    // Code for REROLL button
    $('.restart').on('click', function() {
        const rerollApple = newApple();
        const rerollPie = newPie();
        rerollCorrect = rerollApple * rerollPie;
        $('.dialogueText').html(`Great! The receipe says that I need <span class="highlight">${rerollApple} apple(s)</span> to make one apple pie. I have to make <span class="highlight">${rerollPie} apple pie(s)</span> tonight so how many apples should I get?`);
        $('.applesNeeded').html(rerollApple);
        $('.pies').html(rerollPie);
        $('.character').html(charaImg.img01);
    });


    // Code for INPUT VALUE and SUBMIT
    $('form').on('submit', function(event) {
        event.preventDefault();
        answerApple = $('#answer').val();
        $('#answer').val('');
        checkAnswer();
    });


    // Code for checking correct answers
    function checkAnswer() {
        if (answerApple == correct) {
            $('.dialogueText').html(charaConvo.convo5);
            $('.character').html(charaImg.img04);
        } else if (answerApple == rerollCorrect) {
            $('.dialogueText').html(charaConvo.convo5);
            $('.character').html(charaImg.img04);
        } else {
            $('.dialogueText').html(charaConvo.convo4);
            $('.character').html(charaImg.img03);
        }
    }

});