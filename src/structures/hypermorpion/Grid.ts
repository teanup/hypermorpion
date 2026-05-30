const WINNING_CONFIGS = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

export class Grid {
  squares: (number | null)[] = [
    null, null, null,
    null, null, null,
    null, null, null,
  ];
  fullSquares: number = 0;
  winner: number | null = null;

  getSquare(squareId: number) {
    return this.squares[squareId];
  }

  setSquare(squareId: number, value: number) {
    this.squares[squareId] = value;
  }

  isFull() {
    return this.fullSquares === 9;
  }

  getWinner() {
    return this.winner;
  }

  async getAvailableSquares() {
    const availableSquares: number[] = [];

    for (let sqId = 0; sqId < this.squares.length; sqId++) {
      if (this.squares[sqId] === null) availableSquares.push(sqId);
    }

    return availableSquares;
  }

  async updateWinner() {
    for (const config of WINNING_CONFIGS) {
      const sq1 = this.squares[config[0]];
      const sq2 = this.squares[config[1]];
      const sq3 = this.squares[config[2]];

      // User won
      if (sq1 !== null && sq1 === sq2 && sq2 === sq3) {
        this.winner = sq1;
        return;
      }
    }

    // Tie
    if (this.isFull()) {
      this.winner = 3;
    }
  }

  async play(player: number, squareId: number) {
    this.setSquare(squareId, player);
    this.fullSquares++;
    await this.updateWinner();
  }
}
