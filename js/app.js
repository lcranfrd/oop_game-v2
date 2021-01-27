/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
"use strict";
const screenDiv = document.querySelector('#overlay');
const keyBtns = document.querySelectorAll('.key');
const phraseUl = document.querySelector('#phrase ul');
const livesLis = document.querySelectorAll('[alt="Heart Icon"]');
const message = document.querySelector('#game-over-message');
const qwerty = document.querySelector('#qwerty')


let game;
function goGame() {
  game = new Game();
  game.startGame();
  qwerty.addEventListener('click', function(e) {
    game.handleInteraction(e);
  });
}

function resetGame() {
  // game = null;
  // console.log(game);
  Object.entries(phraseUl.children).forEach((v) => v[1].remove());
  Object.entries(livesLis).forEach((v) => v[1].src = 'images/liveHeart.png');
  Object.entries(keyBtns).forEach((v)=> {
    v[1].classList.remove('chosen', 'wrong');
    v[1].disabled = false;
});
  message.innerHTML = '';
  qwerty.removeEventListener('click', function(e) {
    game.handleInteraction(e);
  });
  game = null;
  goGame();
}

document.querySelector('#btn__reset').addEventListener('click', resetGame);