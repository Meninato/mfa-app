export const draw = {
  TopToBottom: "fromTop",
  BottomToUp: "fromBottom",
  Random: "random"
} as const;

export type DrawTypes = typeof draw[keyof typeof draw];