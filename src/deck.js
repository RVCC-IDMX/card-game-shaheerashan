/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
const SUITS = ['♠', '♣', '♥', '♦'];
const VALUES = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
export default class Deck {
  // eslint-disable-next-line no-use-before-define
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }
  get numberOfCards() {
    return this.cards.length;
  }
  pop() {
    return this.cards.shift();
  }
  push(card) {
    this.cards.push(card);
  }
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i -= 1) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
  get color() {
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
  }
  getSuit() {
    return this.suit;
  }

  getElement() {
    const cardDiv = document.createElement('div');
    cardDiv.innerText = this.suit;
    cardDiv.classList.add('card', this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }

  getHTML() {
    return this.getElement().outerHTML;
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => VALUES.map((value) => new Card(suit, value)));
}
