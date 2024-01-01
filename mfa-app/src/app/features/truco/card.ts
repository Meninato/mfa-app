import { RanksType } from "./ranks";
import { SuitsType } from "./suits";

export class Card {
  public readonly suit: SuitsType;
  public readonly rank: RanksType;
  public readonly value: Number;

  constructor(suitType: SuitsType, rankType: RanksType, value: Number) {
    this.suit = suitType;
    this.rank = rankType;
    this.value = value;
  }
}