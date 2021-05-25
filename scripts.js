$(document).ready(function() {

    // Some variable to use later
    let counter = 0;
    let answerApple;
    let rerollCorrect;
    const screen = window.matchMedia(`(max-width: 768px)`);


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
        default: `To get started, just click on the &#10095; arrow next to this text box!`,
        convo0: `Hey there! I need to buy enough apples to make some apple pie for tonight's party.`,
        convo1: `Can you help me find out how many apples I need to get?`,
        convo2: `Awww! Don't be like that. Help a friend out!`,
        convo3: generateConvo(generateApple, generatePie),
        convo4: `Hmmm... Are you sure about that?`,
        convo5: `I see! Thanks for the help. I'll make sure to save you a slice!`
    };

    function generateConvo(getApple, getPie){
        if (getApple === 1){
            return `Great! The recipe says that I need <span class="highlight">${getApple} apple</span> to make one apple pie. I have to make <span class="highlight">${getPie} apple pies</span> tonight so how many apples should I get?`
        } else if (getPie === 1){
            return `Great! The recipe says that I need <span class="highlight">${getApple} apples</span> to make one apple pie. I have to make <span class="highlight">${getPie} apple pie</span> tonight so how many apples should I get?`
        } else if (getApple && getPie === 1){
            return `Great! The recipe says that I need <span class="highlight">${getApple} apple</span> to make one apple pie. I have to make <span class="highlight">${getPie} apple pie</span> tonight so how many apples should I get?`
        } else {
            return `Great! The recipe says that I need <span class="highlight">${getApple} apples</span> to make one apple pie. I have to make <span class="highlight">${getPie} apple pies</span> tonight so how many apples should I get?`
        };
    };

    
    // Character images
    const charaImg = {
        img01: `<img src="./assets/char_01.png" alt="Illustration of Exusiai looking confident.">`,
        img02: `<img src="./assets/char_02.png" alt="Illustration of Exusiai looking hushed.">`,
        img03: `<img src="./assets/char_03.png" alt="Illustration of Exusiai looking troubled.">`,
        img04: `<img src="./assets/char_04.png" alt="Illustration of Exusiai looking happy.">`
    };

    const charaImgMobile = {
        img01: `<img src="./assets/char_01m.png" alt="Illustration of Exusiai looking confident.">`,
        img02: `<img src="./assets/char_02m.png" alt="Illustration of Exusiai looking hushed.">`,
        img03: `<img src="./assets/char_03m.png" alt="Illustration of Exusiai looking troubled.">`,
        img04: `<img src="./assets/char_04m.png" alt="Illustration of Exusiai looking happy.">`
    };


    // Default visual settings
    $("#answer:input").prop("disabled", true);
    $('[type="submit"]').prop('disabled', true);


    // Code for the dialogue box toggle
    $('.rightArrow').on('click', function(){
        counter++;
        if (counter == 1) {
            $('.leftArrow').css('visibility', 'visible');
            $('.dialogueText').html(charaConvo.convo0);
        } else if (counter == 2) {
            $('.ynbutton button').css('visibility', 'visible');
            $('.rightArrow').css('visibility', 'hidden');
            $('.dialogueText').html(charaConvo.convo1);
        };
    });

    $('.leftArrow').on('click', function(){
        counter--;
        if (counter == 0) {
            $('.ynbutton button, .leftArrow').css('visibility', 'hidden');
            $('.rightArrow').css('visibility', 'visible');
            $('.dialogueText').html(charaConvo.default);
            screen.matches ? $('.characterMobile').html(charaImgMobile.img01) : $('.character').html(charaImg.img01)
        } else if (counter == 1) {
            $('.ynbutton button').css('visibility', 'hidden');
            $('.leftArrow, .rightArrow').css('visibility', 'visible');
            $('.dialogueText').html(charaConvo.convo0);
            screen.matches ? $('.characterMobile').html(charaImgMobile.img01) : $('.character').html(charaImg.img01)
        };
    });


    // Code for YES or NO button
    $('#y').on('click', function(){
        $('.ynbutton button, .leftArrow').addClass('hide');
        $('.equation').addClass('hidePseudo');
        $('.applesNeeded, .pies').css('visibility', 'visible');
        $('.applesNeeded').html(generateApple);
        $('.pies').html(generatePie);
        $('.dialogueText').html(charaConvo.convo3);
        $("#answer:input").prop("disabled", false);
        $('[type="submit"]').prop('disabled', false);
        screen.matches ? $('.characterMobile').html(charaImgMobile.img01) : $('.character').html(charaImg.img01)
    });

    $('#n').on('click', function(){
        $('.dialogueText').html(charaConvo.convo2);
        screen.matches ? $('.characterMobile').html(charaImgMobile.img02) : $('.character').html(charaImg.img02)
    });


    // Code for REROLL button
    $('.restart').on('click', function() {
        const rerollApple = newApple();
        const rerollPie = newPie();
        rerollCorrect = rerollApple * rerollPie;
        $('.dialogueText').html(generateConvo(rerollApple, rerollPie));
        $('.applesNeeded').html(rerollApple);
        $('.pies').html(rerollPie);
        $('.restart').css('visibility', 'hidden');
        screen.matches ? $('.characterMobile').html(charaImgMobile.img01) : $('.character').html(charaImg.img01)
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
            $('.restart').css('visibility', 'visible');
            screen.matches ? $('.characterMobile').html(charaImgMobile.img04) : $('.character').html(charaImg.img04)
        } else if (answerApple == rerollCorrect) {
            $('.dialogueText').html(charaConvo.convo5);
            $('.restart').css('visibility', 'visible');
            screen.matches ? $('.characterMobile').html(charaImgMobile.img04) : $('.character').html(charaImg.img04)
        } else {
            $('.dialogueText').html(charaConvo.convo4);
            screen.matches ? $('.characterMobile').html(charaImgMobile.img03) : $('.character').html(charaImg.img03)
        };
    };

});