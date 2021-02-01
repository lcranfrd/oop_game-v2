/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
"use strict";

/**------------------------------------------------------------------------
 * *                                Phrase Class
 * *    Controls phrase output to DOM and compares played letter to phrase.
 * * Methods:
 * * addPhraseToDisplay()
 * * checkLetter()
 * * showMatchedLetter()
 *------------------------------------------------------------------------**/
class Phrase {
  constructor(phrase) {
    this.originalPhrase = phrase;
    this.phrase = phrase.toLowerCase();
  }
  
  /**------------------------------------------------------------------------
   **                           addPhraseToDisplay
   *?  Adds the phrase to the gameboard DOM area and sets the class names to
   *?  the li elements so they are hidden.
   *@return null
   *------------------------------------------------------------------------**/
  addPhraseToDisplay() {
    let time = .5;
    [...this.phrase].forEach((v) => {
      const newLi = document.createElement('li');
      newLi.className = (v !== ' ')? `hide build ${v}`: 'space';
      newLi.textContent = v;
      phraseUl.appendChild(newLi);
    });
    const aniWait = setTimeout(ani, 250);
    function ani() {
      Object.entries(phraseUl.children).forEach((v) => {
        v[1].style.transform = 'rotateY(180deg)';
        v[1].style.transition = 'all ' + time + 's .25s';
        v[1].classList.remove('build');
        if(v[1].textContent !== ' ')
          v[1].classList.add('letter');
        time += .25;
      });
    }
  }

/**-------------------------------------------------------------------------
 **                           checkLetter
 *?  Checks the played letter against the phrase for containment.
 *@param letter string charachter  
 *@return Boolean
 *------------------------------------------------------------------------**/
  checkLetter(letter) {
    return (this.phrase.includes(letter));
  }

  /**------------------------------------------------------------------------
   **                           ShowMatchedLetter
   *?  Passed letter on phrase will be shown on gameboard by setting class
   *?  name from hide to show with animation.
   *@param letter string character
   *@return null
   *-----------------------------------------------------------------------**/
  showMatchedLetter(letter) {
    const matchLis = document.getElementsByClassName(letter);
    Object.values(matchLis).forEach((v) => {
      v.style.transform = 'rotateY(0deg)';
      v.style.transition = 'transform 2s';
      v.classList.remove('hide');
      v.classList.add('show');
    });
  }
}