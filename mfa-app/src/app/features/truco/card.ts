export const cardFaces = {
  Up: "up",
  Down: "down"
} as const;

export type CardFaceTypes = typeof cardFaces[keyof typeof cardFaces];

export const cardRanks = {
  Two: "2",
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Ten: "10",
  Jack: "J",
  Queen: "Q",
  King: "K",
  Ace: "A"
} as const;

export type CardRankTypes = typeof cardRanks[keyof typeof cardRanks];

export const cardSuits = {
  Hearts: "hearts",
  Clubs: "clubs",
  Diamonds: "diamonds",
  Spades: "spades"
} as const;

export type CardSuitTypes = typeof cardSuits[keyof typeof cardSuits];

export class Card {
  public readonly suit: CardSuitTypes;
  public readonly rank: CardRankTypes;
  public value: Number;
  public face: CardFaceTypes = "up";
  
  constructor(suitType: CardSuitTypes, rankType: CardRankTypes, value: Number) {
    this.suit = suitType;
    this.rank = rankType;
    this.value = value;
  }
}