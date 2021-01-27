/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
"use strict";

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  createPhrases() {
    return ['A Fool and His Money Are Soon Parted',
            'Grinning From Ear to Ear',
            'Not a Happy Camper',
            'Cut The Mustard',
            'The Quick Brown Fox Jumps Over The Lazy Dog']
            .map((v) => new Phrase(v));
  }

  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  startGame() {
    const screenDiv = document.querySelector('#overlay');
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    screenDiv.style.display = 'none';
  }
  
  handleInteraction(e) {
    if(e.target.nodeName === 'BUTTON') {
      this.activePhrase.checkLetter(e.target.innerText);
    }
  }

  checkForWin() {
    letterLis = document.getElementsByClassName('letter');
    return (Object.values(letterLis).every((v) => v.classList.contains('show')));
  }

  removeLife() {
    this.missed++;
    const livesLis = document.querySelectorAll('[alt="Heart Icon"]');
    const lives = livesLis.length - this.missed;
    console.log(livesLis[lives].src);
    livesLis[lives].src = 'images/lostHeart.png';
    !lives && this.gameOver(false);
  }
  
  gameOver(gameWon) {
    const screenDiv = document.querySelector('#overlay');
    let message = document.querySelector('#game-over-message');
    if(gameWon) {
      message.innerHTML = `Congratulatons You Won!<br>
        The Phrase:<br>
        ${this.activePhrase.originalPhrase}`;
      screenDiv.className = 'win';
    }else {
      message.innerHTML= `Sorry, You did not guess the phrase!<br>
        Try again`;
      screenDiv.className = 'lose';
    };
    screenDiv.style.display = 'block'
  }
}