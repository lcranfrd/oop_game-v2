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

/**------------------------------------------------------------------------
 **                           resetGame
 *?  Start and reset for new Game. Will clear used class names, remove
 *?  li elements from previous game, and reset endgame message. Calls the
 *?  game.startGame() method to begin.
 *@return null
 *------------------------------------------------------------------------**/
function resetGame() {
  console.log(phraseUl.children);
  Object.entries(phraseUl.children).forEach((v) => v[1].remove());
  console.log(phraseUl.children);
  Object.entries(livesLis).forEach((v) => v[1].src = 'images/liveHeart.png');
  Object.entries(keyBtns).forEach((v)=> {
    v[1].classList.remove('chosen', 'wrong');
    v[1].disabled = false;
  });
  message.innerHTML = '';
  game.startGame();
}

/**------------------------------------------------------------------------
 * *                                INFO
 *   Set evenlisteners for Reset Button, 'qwerty' keyboard area and
 *   user keyboard input.
 *   'qwerty' listener will delegate to button elements only.
 *   User keyboard listener passes only Alpha characters.
 *------------------------------------------------------------------------**/

  document.querySelector('#btn__reset').addEventListener('click', resetGame);

  qwerty.addEventListener('click', (e) => {
    if(e.target.nodeName === 'BUTTON') {
      game.handleInteraction(e);
    }
  });

  document.addEventListener('keyup', (e) => {
    if(/^[a-zA-Z]$/.test(e.key))
      game.handleInteraction(e);
  });