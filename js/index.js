let screen = '';
let lastChar = '';
let answer = '';
const mathOp = /\+×÷-/;

// Number Buttons
$('.numBtn').click(function () {
  const numHit = $(this).attr('value');
  screen = $('.screen').text();
  // Ensure there is enough space and no leading zeroes
  if (screen.length < 11 && screen !== '0') {
    $('.screen').append(numHit);
  }
});

// Decimal Button
$('.decBtn').click(() => {
  screen = $('.screen').text();
  // If no decimals, add one
  if (screen.length < 10 && !screen.includes('.')) {
    $('.screen').append('.');
  } else if (
    screen.match(mathOp) &&
      screen.lastIndexOf('.') < screen.search(mathOp)
  ) {
    // If only one decimal before operator, allow another
    $('.screen').append('.');
  }
});

// All-Clear Button
$('#btnAC').click(() => {
  $('.screen').text('');
  screen = '';
  lastChar = '';
  answer = '';
});

// Clear-Entry Button
$('#btnCE').click(() => {
  $('.screen').text($('.screen').text().slice(0, -1));
});

// Operator Buttons
$('.opBtn').click(function () {
  screen = $('.screen').text();
  // If screen is blank, don't do anything
  if (!screen) return;
  // Otherwise, get last character for upcoming test
  lastChar = screen[screen.length - 1];
  // Ensure screen isn't full and last character isn't an operator or decimal
  if (screen.length < 10 && !lastChar.match(mathOp) && lastChar !== '.') {
    $('.screen').append($(this).attr('value'));
  } else if (lastChar.match(mathOp)) {
    // If last character is an operator, change it to button pressed
    const lastOper = $(this).attr('value');
    $('.screen').text(screen.replace(/.$/, lastOper));
  }
});

$('.eqBtn').click(() => {
  screen = $('.screen').text();
  // If screen is blank, don't do anything
  if (!screen) return;
  // Get last character for upcoming test
  lastChar = screen[screen.length - 1];
  // If last character isn't an operator & user isn't dividing by zero,
  // evaluate the expression
  if (!lastChar.match(mathOp) && !screen.includes('÷0')) {
    // Convert '×' to 'x' and '÷' to '/' for eval function
    let expression = screen.replace(/×/g, '*');
    expression = expression.replace(/÷/g, '/');
    answer = parseFloat(eval(expression).toFixed(3));
    $('.screen').text(answer);
  }
});
