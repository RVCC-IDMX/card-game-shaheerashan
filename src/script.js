/* eslint-disable no-plusplus */
import Deck from './deck.js';
import { select, listen } from './util.js';

const cardSlotElement = select('.card-slot');
const deckElement = select('.deck');
const textElement = select('.text');
const newGameButton = select('#new-game-button');
const diamondsButton = select('#diamonds-button');
const heartsButton = select('#hearts-button');
const clubsButton = select('#clubs-button');
const spadesButton = select('#spades-button');

let deck;
let score;

listen(newGameButton, 'click', startGame);
listen(diamondsButton, 'click', () => {
  playRound('♦');
});
listen(heartsButton, 'click', () => {
  playRound('♥');
});
listen(clubsButton, 'click', () => {
  playRound('♣');
});
listen(spadesButton, 'click', () => {
  playRound('♠');
});

function startGame() {
  console.log('This is the startGame function');

  deck = new Deck();
  deck.shuffle();

  cleanUp();
  console.log(deck.cards[0]);

  textElement.innerText = 'Pick a suit';
}

function playRound(prediction) {
  console.log(prediction);
  console.log('This is the playRound function');
  if (deck.numberOfCards > 0) {
    const topCard = flipCard();
    // eslint-disable-next-line no-use-before-define
    if (isWinner(topCard, prediction)) {
      score += 4;
      textElement.innerText = `YOU WON! SCORE: ${score}`;
    } else {
      score--;
      textElement.innerText = `YOU LOST! SCORE: ${score}`;
    }
  } else {
    textElement.innerText = `Oops, No More Cards. Final Score: ${score}`;
  }
}

function cleanUp() {
  textElement.innerText = '';
  cardSlotElement.innerHTML = '';
  // eslint-disable-next-line no-use-before-define
  updateDeckCount();
  score = 0;
}

function updateDeckCount() {
  deckElement.innerText = deck.numberOfCards;
}

function flipCard() {
  const card = deck.pop();

  cardSlotElement.innerHTML = card.getHTML();
  updateDeckCount();
  return card;
}

function isWinner(topCard, prediction) {
  return topCard.getSuit() === prediction;
}

startGame();
