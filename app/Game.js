import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

class Game {
  constructor(playersCard, dealersCards, player) {
      this.player = player;
      this.playersCard = playersCard;
      this.dealersCards = dealersCards;
  }

  run() {
    const deck = new Deck();
    console.log(deck.shuffle());
  }
}

const player = new Player('Marcin');
const game = new Game({
    player,
    playersCards: document.getElementById('playersCards'),
    dealersCards: document.getElementById('dealersCards')
});
