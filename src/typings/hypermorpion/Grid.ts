export type GridType = {
  squares: (number | null)[];
  fullSquares: number;
  winner: number | null;

  getSquare: (squareId: number) => number;
  setSquare: (squareId: number, value: number) => void;
  isFull: () => boolean;
  getWinner: () => number;
  getAvailableSquares: () => Promise<number[]>;
  updateWinner: () => Promise<void>;
  play: (player: number, squareId: number) => Promise<void>;
};
