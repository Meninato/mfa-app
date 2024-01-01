import { Card } from "./card";
import { DrawTypes } from "./draws";

interface IPickOptions {
  quantity?: number;
  draw?: DrawTypes;
}

interface IDeckOfCards {
  getCards(): Card[];
  shuffle(): void;
  pick(options?: IPickOptions): Card[] | string;
  drawStrategy: DrawTypes;
}

export class Deck implements IDeckOfCards {
  private pickStrategies = new Map<DrawTypes, (qty: number) => Card[]>([
    ["fromTop", this.pickCardFromTop],
    ["fromBottom", this.pickCardFromBottom],
    ["random", this.pickCardRandom],
  ]);
  private cards: Card[];
  drawStrategy: DrawTypes = "fromTop";

  public constructor(cards: Card[]) {
    this.cards = cards;
  }

  public getCards(): Card[] {
    const json = JSON.stringify(this.cards);
    return JSON.parse(json);
  }

  public shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public pick(options?: IPickOptions): Card[] | string {

    const draw: DrawTypes = options && options.draw ? options.draw : this.drawStrategy;
    const pick: number = options && options.quantity ? options.quantity : 1; 

    if(this.cards.length == 0) {
      return "Deck is empty";
    } else if(this.cards.length < pick) {
      return "Not enough cards to draw";
    } else {
      const method = this.pickStrategies.get(draw)!;
      return method.call(this, pick);
    }
  }

  private pickCardFromTop(pick: number): Card[] {
    return this.cards.splice(pick * -1);
  }

  private pickCardFromBottom(pick: number): Card[] {
    return this.cards.splice(0, pick);
  }

  private pickCardRandom(pick: number): Card[] {
    let randomIndex;
    let pickedCards: Card[] = [];
    for(let i = 0; i < pick; i++) {
      randomIndex = Math.floor(Math.random() * this.cards.length);
      pickedCards = pickedCards.concat(this.cards.splice(randomIndex, 1));
    }
    return pickedCards;
  }


}