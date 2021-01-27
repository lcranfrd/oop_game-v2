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
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    this.missed = 0;
    screenDiv.style.display = 'none';
  }
  
  handleInteraction(e) {
    let letter = '';
    let target = null;

    switch(e.type) {
      case 'click':
        letter = e.target.innerText.toLowerCase();
        target = e.target;
        break;
      case 'keyup':
        letter = e.key.toLowerCase();
        target = (Object.entries(keyBtns)
          .filter((v)=>v[1]
          .innerText === letter))[0][1];
        break;
    }

    if(this.activePhrase.checkLetter(letter)) {
      this.activePhrase.showMatchedLetter(letter);
      target.classList.add('chosen');
      this.checkForWin() && this.gameOver(true);
    } else if(!target.disabled) {
        target.disabled = true;
        this.removeLife();
        target.classList.add('wrong');
      }
  }

  checkForWin() {
    const letterLis = document.getElementsByClassName('letter');
    return (Object.values(letterLis).every((v) => v.classList.contains('show')));
  }

  removeLife() {
    this.missed++;
    const lives = livesLis.length - this.missed;
    livesLis[lives].src = 'images/lostHeart.png';
    !lives && this.gameOver(false);
  }
  
  gameOver(gameWon) {
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
    screenDiv.style.display = 'flex'
  }
}