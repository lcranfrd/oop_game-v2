/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
"use strict";

let game;
function goGame() {
  game = new Game();
  game.startGame();
}

document.querySelector('#btn__reset').addEventListener('click', goGame);
document.querySelector('#qwerty').addEventListener('click', function(e) {
  game.handleInteraction(e);
});