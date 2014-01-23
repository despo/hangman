function newGame() {
  $.ajax({
    type: "POST",
    url: "/hangman",
  }).done(function(data) {
    $('.hangman-word').text(data.hangman);
    $('.token').text(data.token);
  }).fail(function(data) {
    console.log(data)
  });
}

function guess(token, letter) {
  $.ajax({
    type: "PUT",
    dataType: 'json',
    url: "/hangman",
    data: { "token": token, "letter": letter},
    beforeSend: function() {
      $(".letter").prop('disabled', true);
    }
  }).done(function(data) {
    $('.hangman-word').text(data.hangman);
    $('.token').text(data.token);
    if (!data.correct) {
      failures = $('.wrong').length+1;
      drawHangman(failures);
    } else {
      if (data.hangman.indexOf("_") == -1) {
        getWordDefinition(data.hangman);
        $('.console').hide();
      }
    }
    cssClass = data.correct ? 'correct' : 'wrong';
    $('.attempts').append("<span class=" + cssClass +">"+letter+"</span>");
    $(".letter").prop('disabled', false);
  }).fail(function(data) {
    console.log(data)
  });
}

function getSolution(token) {
  $.ajax({
    type: "GET",
    dataType: 'json',
    url: "/hangman",
    data: { "token": token },
  }).done(function(data) {
    var hangman_word = $('.hangman-word').text();
    var solution = data.solution;

    for (var i = solution.length-1; i >= 0; i--) {
      if (hangman_word.charAt(i) != solution.charAt(i)) {
        error_string = "<span class='error'>"+ solution.charAt(i) + "</span>";
        updated_word = hangman_word
        hangman_word = updated_word.substr(0, i) + error_string + updated_word.substr(i+1);
      } else {
        if (hangman_word.indexOf("_") == -1) {
          $('.console').hide();
        }
      }
    }
    getWordDefinition(solution);
    $('.hangman-word').html(hangman_word);
  }).fail(function(data) {
    console.log(data)
  });
}

function drawHangman(failures){
  var canvas = $('#hangman-game')[0];
  var context = canvas.getContext("2d");
  context.strokeStyle = '#000000';

  switch (failures) {
    case 1: drawHead(context); break;
    case 2: drawBody(context); break;
    case 3: drawRightHand(context); break;
    case 4: drawLeftHand(context); break;
    case 5: drawRightFoot(context); break;
    case 6: drawLeftFoot(context); break;
    case 7: var token = $('.token').text();
            getSolution(token);
            hang(context);
            $('.console').slideToggle(1200);
  }
}

function getWordDefinition(word) {
  console.log(word);
  $.ajax({
    url: "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions",
    data: { limit: 200, includeRelated: false, useCanonical: false, includeTags: false, api_key: 'd55b886c9abe00340b00d0c2add0c12cc6b6ee7084476d96c' },
    beforeSend: function() {
      $('.definition').html("<img height=10 src=spinner.gif></img>");
    }
  }).done(function(data) {
    if (data.length > 0) {
      length = data.length > 2 ? 2 : data.length;
      for (var i = 0; i < 2; i++) {
        $('.definition').text(data[i].text);
      }
    }
  }).fail(function() {
    console.log("Unable to retrieve word definition from http://api.wordnik.com:80.");
  });
}

function hang(context) {
  context.strokeStyle = '#da5754';
  drawHead(context);
  drawBody(context);
  drawRightHand(context);
  drawLeftHand(context);
  drawRightFoot(context);
  drawLeftFoot(context);
}

function drawGallows(){
  var canvas = $('#hangman-game')[0];
  var context = canvas.getContext("2d");
  canvas.width = canvas.width;

  context.strokeStyle = '#000000';

  context.lineWidth = 20;
  context.beginPath();
  context.moveTo(350, 450);
  context.lineTo(10, 450);
  context.lineTo(70, 450);

  context.lineTo(70, 10);
  context.lineTo(200, 10);
  context.lineTo(200, 50);
  context.stroke();
}

function drawHead(context) {
  context.beginPath();
  context.arc(200, 100, 50, 0, Math.PI*2, true);
  context.closePath();
  context.lineWidth = 4;
  context.stroke();
}

function drawBody(context) {
  context.beginPath();
  context.moveTo(200, 150);
  context.lineTo(200, 300);
  context.stroke();
}

function drawRightHand(context) {
  context.beginPath();
  context.moveTo(200, 170);
  context.lineTo(150, 250);
  context.stroke();
}

function drawLeftHand(context) {
  context.beginPath();
  context.moveTo(200, 170);
  context.lineTo(250, 250);
  context.stroke();
}

function drawRightFoot(context) {
  context.beginPath();
  context.moveTo(200, 300);
  context.lineTo(150, 380);
  context.stroke();
}

function drawLeftFoot(context) {
  context.beginPath();
  context.moveTo(200, 300);
  context.lineTo(250, 380);
  context.stroke();
}

$(document).ready(function(){
  drawGallows();
  $('.console').hide();

  $(document).on('click', '#new-game', function(e){
    drawGallows();
    $('.attempts').empty();
    $('.definition').empty();

    newGame();
    $('.console').slideToggle(1200);
    $('.letter').focus();
  })

  $(document).on('click', '#guess', function(e){
    token = $('.token').text();
    letter = $('.letter').val();
    attempts = $('.attempts').text().toLowerCase();

    $('.letter').focus();

    if ($.isNumeric(letter) || letter.trim().length < 1 || attempts.indexOf(letter.toLowerCase()) != -1) {
      $('.letter').addClass("error");
      return;
    }
    $('.letter').removeClass("error");
    $('.letter').val('');

    guess(token, letter);
  })
});
