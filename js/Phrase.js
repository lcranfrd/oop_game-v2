/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
"use strict";

class Phrase {
  constructor(phrase) {
    this.originalPhrase = phrase;
    this.phrase = phrase.toLowerCase();
  }
  
  addPhraseToDisplay() {
    const phraseUl = document.querySelector('#phrase ul');
    [...this.phrase].forEach(function(v)  {
      const newLi = document.createElement('li');
      newLi.className = (v !== ' ')? `hide letter ${v}`: 'space';
      newLi.textContent = v;
      phraseUl.appendChild(newLi);
    });
  }

  checkLetter(letter) {
    return (this.phrase.includes(letter));

  }

  showMatchedLetter(letter) {
    const matchLis = document.getElementsByClassName(letter);
    Object.values(matchLis).forEach((v) => {
      v.classList.remove('hide');
      v.classList.add('show');
    });
  }
}