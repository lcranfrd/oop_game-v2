/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
"use strict";

/**------------------------------------------------------------------------
 * *                                Game Class
 * *                            Controls game flow
 * * Methods:
 * * createPhrases()
 * * getrandomPHrase()
 * * startGame()
 * * handleIneratction()
 * * checkForWin()
 * * removeLife()
 * * gameOver()
 * 
 *------------------------------------------------------------------------**/
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**------------------------------------------------------------------------
   **                           createPhrases
   *?  Sets Phrases object from array of phrases.
   *@return Object
   *------------------------------------------------------------------------**/
  createPhrases() {
    return ['A Fool and His Money Are Soon Parted',
            'Grinning From Ear to Ear',
            'Not a Happy Camper',
            'Cut The Mustard',
            'The Quick Brown Fox Jumps Over The Lazy Dog']
            .map((v) => new Phrase(v));
  }

  /**------------------------------------------------------------------------
   **                           getRandomPhrase
   *?  Get random phrase object from phrases object.
   *@return object
   *------------------------------------------------------------------------**/
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**------------------------------------------------------------------------
   **                           startGame
   *?  Begin game by setting activePhrase and missed counter. Sends
   *?  activePhase to the DOM. Turns off the overlay to reveal the game board.
   *@return null
   *------------------------------------------------------------------------**/
  startGame() {
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    screenDiv.style.display = 'none';
  }
  

  /**------------------------------------------------------------------------
   **                           handleInteraction
   *?  Accepts either mouse or keyboard event object and will set variables
   *?  according to event type.
   *?  Tests input letter against phrase. If found, phrase board will reveal.
   *?  User keyboard letter disabled for letter played.
   *?  Hearts area updated if played letter not found.
   *@param e Event Object
   *@return null
   *------------------------------------------------------------------------**/
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
          .filter((v) => v[1].innerText === letter))[0][1];
        break;
    }
      if(this.activePhrase.checkLetter(letter)) {
        this.activePhrase.showMatchedLetter(letter);
        target.classList.add('chosen');
        target.disabled = true;
      } else if(!target.disabled) {
          this.removeLife();
          target.classList.add('wrong');
          target.disabled = true;
      }
      this.checkForWin() && this.gameOver(true);
  }

/**------------------------------------------------------------------------
 **                           checkForWin
 *?  Check if all letters in phrase have been chosen.
 *@return Boolean
 *------------------------------------------------------------------------**/
  checkForWin() {
    const letterLis = document.getElementsByClassName('letter');
    return (Object.values(letterLis).every((v) => v.classList.contains('show')));
  }

/**------------------------------------------------------------------------
 **                           removeLife
 *?  Remove life heart by changing img.src to that showing lost heart.
 *?  Increase the misssed counter.
 *?  Calls the gameOver() method is gam is lost (0 lives).
 *@return null
 *------------------------------------------------------------------------**/
  removeLife() {
    this.missed++;
    const lives = livesLis.length - this.missed;
    livesLis[lives].classList.add('broken-heart');
    livesLis[lives].src = 'images/lostHeart.png';
    !lives && this.gameOver(false);
  }
  
  /**------------------------------------------------------------------------
   **                           gameOver
   *?  Sets and displays gameover message according to win/lose. If won, will
   *?  show the phrase for review.
   *@param gameWon Boolean
   *@return null
   *------------------------------------------------------------------------**/
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
    screenDiv.style.display = 'flex';
    resetGame();
  }
}