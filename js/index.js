/* jshint browser: true, esversion: 6 */
/* global $, console */

//Global vars
var scrn, lastChar, lastOper, answer;
var mathOp = /[\÷\+\-\×]/;

$(document).ready(() => {

	resetVars();

	//Reset global vars
	function resetVars() {
		scrn = '';
		lastChar = '';
		lastOper = '';
		answer = '';
	}

	//Check for blank screen. If not blank, update lastChar
	function checkBlank() {
		if (scrn === '') return true;
		lastChar = scrn[scrn.length - 1];
		return false;
	}

	//Update screen var when any button is clicked
	$('button').click(() => scrn = $('.screen').text());

	//Number Buttons
	$('.numBtn').click(function () {
		let numHit = $(this).attr('value');
		//Prevent leading zeroes
		if (numHit === '0' && scrn.length === 1 && scrn.indexOf('0') !== -1) {
			return;
		} else if (scrn.length < 11) {
			$('.screen').append(numHit);
		}
	});

	//Decimal Button
	$('.decBtn').click(function () {
		//If no decimals or only one decimal before operator, add one
		if ((scrn.length < 10 && !scrn.includes('.')) || mathOp.test(scrn) && (scrn.lastIndexOf('.') < scrn.search(mathOp)))
			$('.screen').append('.');
	});

	//All-Clear Button
	$('#btnAC').click(() => {
		$('.screen').text('');
		resetVars();
	});

	//Clear-Entry Button
	$('#btnCE').click(() => $('.screen').text(scrn.slice(0, -1)));

	//Operator Buttons
	$('.opBtn').click(function () {
		if (checkBlank()) return;
		//Ensure screen isn't full and last character isn't an operator or decimal
		if (scrn.length < 10 && lastChar.search(mathOp) === -1 && lastChar !== '.') {
			lastOper = $(this).attr('value');
			$('.screen').append(lastOper);
		}
		//If last character is an operator, change it to the last button pressed
		else if (mathOp.test(lastChar)) {
			lastOper = $(this).attr('value');
			$('.screen').text(scrn.slice(0, -1) + lastOper);
		}
	});

	$('.eqBtn').click(() => {
		if (checkBlank()) return;
		//If last character isn't an operator & user isn't dividing by zero,
		//evaluate the expression
		if (!mathOp.test(lastChar) && (scrn.substr(-2, 2) !== '÷0')) {
			//Convert '×' to 'x' and '÷' to '/' for eval function
			var expression = scrn.replace(/×/g, '*');
			expression = expression.replace(/÷/g, '/');
			answer = parseFloat(eval(expression).toFixed(3));
			$('.screen').text(answer);
		}

	});
});
