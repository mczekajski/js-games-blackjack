import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

class Game {
  constructor({player, playersCards, dealersCards}) {
      this.player = player;
      this.dealer = new Player('Krupier');

      this.playersCards = playersCards;
      this.dealersCards = dealersCards;
      this.deck = new Deck();
      this.deck.shuffle();
  }

  run() {
    this.dealCards();
  }

  dealCards() {
      for (let n = 0; n < 2; n++) {
        let card1 = this.deck.pickOne();
        this.player.hand.addCard(card1);
        this.playersCards.appendChild(card1.render());

        let card2 = this.deck.pickOne();
        this.dealer.hand.addCard(card2);
        this.dealersCards.appendChild(card2.render());
      }
  }
}

const player = new Player('Marcin');
const game = new Game({
    player: player,
    playersCards: document.getElementById('playersCards'),
    dealersCards: document.getElementById('dealersCards')
});

game.run();
