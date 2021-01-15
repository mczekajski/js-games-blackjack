import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";

class Game {
  constructor({player, table, hitButton, standButton}) {
      this.hitButton = hitButton;
      this.standButton = standButton;
      this.player = player;
      this.dealer = new Player('Krupier');
      this.table = table;
      this.deck = new Deck();
      this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener('click', () => this.hitCard());
    this.dealCards();
  }
  
  hitCard() {
      const card = this.deck.pickOne();
      this.player.hand.addCard(card);
      this.table.showPlayersCard(card);
  }

  dealCards() {
      for (let n = 0; n < 2; n++) {
        let card1 = this.deck.pickOne();
        this.player.hand.addCard(card1);
        this.table.showPlayersCard(card1);

        let card2 = this.deck.pickOne();
        this.dealer.hand.addCard(card2);
        this.table.showDealersCard(card2);
      }
  }
}

const table = new Table(document.getElementById('playersCards'), document.getElementById('dealersCards'))
const player = new Player('Marcin');
const game = new Game({
    hitButton: document.getElementById('hit'),
    standButton: document.getElementById('stand'),
    player,
    table
});

game.run();
