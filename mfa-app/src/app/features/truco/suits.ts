export const suits = {
  Hearts: "hearts",
  Clubs: "clubs",
  Diamonds: "diamonds",
  Spades: "spades"
} as const;

export type SuitsType = typeof suits[keyof typeof suits];