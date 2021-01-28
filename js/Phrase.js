/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
"use strict";

/**------------------------------------------------------------------------
 * *                                Phrase Class
 *   Controls phrase output to DOM and compares played letter to phrase.
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
    [...this.phrase].forEach((v) => {
      const newLi = document.createElement('li');
      newLi.className = (v !== ' ')? `hide letter ${v}`: 'space';
      newLi.textContent = v;
      phraseUl.appendChild(newLi);
    });
  }

/**------------------------------------------------------------------------
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
   *?  name from hide to show.
   *@param letter string character
   *@return null
   *------------------------------------------------------------------------**/
  showMatchedLetter(letter) {
    const matchLis = document.getElementsByClassName(letter);
    Object.values(matchLis).forEach((v) => {
      v.style.transition = '3s';
      v.style.transform = 'rotateY(-360deg)'
      v.classList.remove('hide');
      v.classList.add('show');
    });
  }
}