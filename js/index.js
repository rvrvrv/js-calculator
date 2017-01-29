/* jshint browser: true, esversion: 6 */
/* global $ */

var scrn = '';
var lastChar = '';
var lastOper = '';
var answer = '';
var mathOp = /[\÷\+\-\×]/;

$(document).ready(function() {

  //Number Buttons
  $('.numBtn').click(function() {
    var numHit = $(this).attr('value');
    scrn = $('.screen').text();
    //Prevent leading zeroes
    if (numHit === '0' && scrn.length === 1 && scrn.indexOf('0') !== -1) {
      return;
    } else if (scrn.length < 11) {
      $('.screen').append(numHit);
    }
  });

  //Decimal Button
  $('.decBtn').click(function() {
    scrn = $('.screen').text();
    //If no decimals, add one
    if (scrn.length < 10 && scrn.indexOf('.') === -1) {
      $('.screen').append('.');
    }
    //If one decimal before operator, add one
    else if (scrn.search(mathOp) !== -1 && scrn.lastIndexOf('.') < scrn.search(mathOp)) {
      $('.screen').append('.');
    }
  });

  //All-Clear Button
  $('#btnAC').click(function() {
    $('.screen').text('');
    var scrn = '';
    var lastChar = '';
    var answer = '';
  });

  //Clear-Entry Button
  $('#btnCE').click(function() {
    $('.screen').text($('.screen').text().slice(0, -1));
  });

  //Operator Buttons
  $('.opBtn').click(function() {
    scrn = $('.screen').text();
    //If screen isn't blank, continue
    if (scrn !== '') {
      //Get last character for upcoming test
      lastChar = scrn[scrn.length - 1];
      //Ensure screen isn't full and last character isn't an operator or decimal
      if (scrn.length < 10 && lastChar.search(mathOp) === -1 && lastChar !== '.') {
        lastOper = $(this).attr('value');
        $('.screen').append(lastOper);
      }
      //If last character is an operator, change it to button pressed
      else if (lastChar.search(mathOp) !== -1) {
        lastOper = $(this).attr('value');
        $('.screen').text($('.screen').text().slice(0, -1) + lastOper);
      }
    }
  });

  $('.eqBtn').click(function() {
    scrn = $('.screen').text();
    //If screen isn't blank, continue
    if (scrn !== '') {
      //Get last character for upcoming test
      lastChar = scrn[scrn.length - 1];
      //If last character isn't an operator & user isn't dividing by zero,
      //evaluate the expression
      if (lastChar.search(mathOp) === -1 && (scrn.substr(-2, 2) !== '÷0')) {
        //Convert '×' to 'x' and '÷' to '/' for eval function
        var expression = scrn.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        answer = parseFloat(eval(expression).toFixed(3));
        $('.screen').text(answer);
      }
    }
  });
});
