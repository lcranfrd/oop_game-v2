/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
"use strict";
const screenDiv = document.querySelector('#overlay');
const keyBtns = document.querySelectorAll('.key');
const livesLis = document.querySelectorAll('[alt="Heart Icon"]');
const phraseUl = document.querySelector('#phrase ul');
const message = document.querySelector('#game-over-message');
const qwerty = document.querySelector('#qwerty')


let game;
game = new Game();

function resetGame() {
  Object.entries(phraseUl.children).forEach((v) => v[1].remove());
  Object.entries(livesLis).forEach((v) => v[1].src = 'images/liveHeart.png');
  Object.entries(keyBtns).forEach((v)=> {
    v[1].classList.remove('chosen', 'wrong');
    v[1].disabled = false;
  });
  message.innerHTML = '';
  game.startGame();
  }
  
  document.querySelector('#btn__reset').addEventListener('click', resetGame);
  qwerty.addEventListener('click', function(e) {
    game.handleInteraction(e);
  });