import { Message } from "discord.js";
import { GameOptionsType } from "../../typings/hypermorpion/Game";
import { Board } from "./Board";
import { BoardImage } from "./Board";

export class Game {
  playerIds: string[] = [];
  playerStrings: string[] = [];
  originalMessage: Message;
  timeToPlay: number = 120_000;
  board: Board = new Board();
  image: BoardImage = new BoardImage();
  curGrid: (number | null) = null;
  curPlayer: number = 1;
  winner: number | null = null;

  constructor({ player1Id, player2Id, originalMessage }: GameOptionsType) {
    this.playerIds = [player1Id, player2Id];
    this.playerStrings = [
      `<@${player1Id}> 🇽`,
      `<@${player2Id}> ⭕️`, 
    ];
    this.originalMessage = originalMessage;
  }

  getCurGrid(): number | null {
    return this.curGrid;
  }

  getCurPlayer(): number {
    return this.curPlayer;
  }

  getWinner(): number | null {
    return this.winner;
  }

  getBoard(): Board {
    return this.board;
  }

  getImage(): BoardImage {
    return this.image;
  }

  async getAvailableSquares(): Promise<number[]> {
    const grid = this.board.grids[this.curGrid!];
    return await grid.getAvailableSquares();
  }

  async updateWinner(): Promise<void> {
    await this.board.updateWinner();
    this.winner = this.board.getWinner();
  }

  async play(squareId: number): Promise<void> {
    const grid = this.board.grids[this.curGrid!];
    await grid.play(this.curPlayer, squareId);
    await this.updateWinner();
    this.curGrid = squareId;
    this.curPlayer = this.curPlayer === 1 ? 2 : 1;
  }

  async storeCurrentImage(): Promise<void> {
    await this.image.storeCurrentImage(this);
  }

  async generateGameEvol(): Promise<void> {
    await this.image.generateGameEvol(this);
  }
}
