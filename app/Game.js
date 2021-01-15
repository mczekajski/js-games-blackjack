import { Deck } from "./Deck.js";
import { Message } from "./Message.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";

class Game {
  constructor({
    player,
    table,
    hitButton,
    standButton,
    dealerPoints,
    playerPoints,
    messageBox
  }) {
    this.messageBox = messageBox;
    this.dealerPoints = dealerPoints;
    this.playerPoints = playerPoints;
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.player = player;
    this.dealer = new Player("Krupier");
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener("click", () => this.hitCard());
    this.standButton.addEventListener("click", () => this.dealerPlays());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playerPoints.innerHTML = this.player.calculatePoints();
    if (this.player.points >= 21) this.endTheGame();
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

    this.playerPoints.innerHTML = this.player.calculatePoints();
    this.dealerPoints.innerHTML = this.dealer.calculatePoints();
  }

  dealerPlays() {
      while (this.dealer.points <= this.player.points && this.dealer.points < 17 && this.player.points <= 21) {
          const card = this.deck.pickOne();
          this.dealer.hand.addCard(card);
          this.table.showDealersCard(card);
          this.dealerPoints.innerHTML = this.dealer.calculatePoints();
      }

      this.endTheGame();
  }

  endTheGame() {
      this.hitButton.removeEventListener('click', () => this.hitCard());
      this.standButton.removeEventListener('click', () => this.dealerPlays());

      this.hitButton.style.display = 'none';
      this.standButton.style.display = 'none';

      if (this.player.points < 21 && this.player.points === this.dealer.points) {
          this.messageBox.setText('Remis').show();
          return;
      }

      if (this.player.points > 21) {
        this.messageBox.setText('Wygrywa Dealer').show();
          return;
      }

      if (this.dealer.points > 21) {
        this.messageBox.setText('Wygrywa Player').show();
          return;
      }

      if (this.player.points < this.dealer.points) {
        this.messageBox.setText('Wygrywa Dealer').show();
          return
      }
  }
}

const table = new Table(
  document.getElementById("playersCards"),
  document.getElementById("dealersCards")
);
const messageBox = new Message(document.getElementById('message')); 

const player = new Player("Marcin");
const game = new Game({
  hitButton: document.getElementById("hit"),
  standButton: document.getElementById("stand"),
  dealerPoints: document.getElementById("dealerPoints"),
  playerPoints: document.getElementById("playerPoints"),
  player,
  table,
  messageBox
});

game.run();
