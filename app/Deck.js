import { Card, Types, Weights } from "./Card.js";

export class Deck {
  cards = [];

  constructor() {
    Types.forEach((type) =>
      Weights.forEach((weight) => this.cards.push(new Card(weight, type)))
    );
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
    return this.cards;
  }
}
