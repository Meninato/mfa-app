import { Card, CardRankTypes, cardRanks, cardSuits } from "./card";

export const cardGames = {
  Truco: "truco"
} as const;

export type CardGameTypes = typeof cardGames[ keyof typeof cardGames];

export const draw = {
  TopToBottom: "fromTop",
  BottomToUp: "fromBottom",
  Random: "random"
} as const;

export type DrawTypes = typeof draw[keyof typeof draw];

export interface IPickOptions {
  quantity?: number;
  draw?: DrawTypes;
}

export interface IDeckOfCards {
  getCards(): Card[];
  shuffle(times?: number): void;
  pick(options?: IPickOptions): Card[] | string;
  drawStrategy: DrawTypes;
}

export class Deck implements IDeckOfCards {
  private static pickCardValues = new Map<CardGameTypes, () => Deck>([
    ["truco", Deck.buildCardsForGameTruco]
  ]);
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

  public shuffle(times?: number) {
    let timesToShuffle = 1;
    if(times) {
      timesToShuffle = times;
    }

    for(let x = 0; x < timesToShuffle; x++) {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
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

  public static factoryCards(game: CardGameTypes): Deck {
      const method = Deck.pickCardValues.get(game)!;
      return method();
  }

  private static buildCardsForGameTruco(): Deck {
    const cards: Card[] = [];
    let card: Card;
    let suitProperty: keyof typeof cardSuits;

    const trucoRanks = new Map<CardRankTypes, number>([
      [cardRanks.Four, 1],
      [cardRanks.Five, 2],
      [cardRanks.Six, 3],
      [cardRanks.Seven, 4],
      [cardRanks.Queen, 5],
      [cardRanks.Jack, 6],
      [cardRanks.King, 7],
      [cardRanks.Ace, 8],
      [cardRanks.Two, 9],
      [cardRanks.Three, 10]
    ]);

    for(const [rankType, value] of trucoRanks) {
      for(suitProperty in cardSuits) {
        card = new Card(cardSuits[suitProperty], rankType, value);
        cards.push(card);
      }
    }

    return new Deck(cards);
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