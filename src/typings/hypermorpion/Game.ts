import { Message } from "discord.js";
import { BoardType } from "./Board";

export type GameOptionsType = {
  player1Id: string;
  player2Id: string;
  originalMessage: Message;
};

export type GameType = {
  playerIds: string[];
  playerStrings: string[];
  originalMessage: Message;
  timeToPlay: number;
  board: BoardType;
  image: BoardImageType;
  curGrid: (number | null);
  curPlayer: number;
  winner: number | null;

  getCurGrid: () => number | null;
  getCurPlayer: () => number;
  getWinner: () => number | null;
  getBoard: () => BoardType;
  getImage: () => BoardImageType;
  getAvailableSquares: () => Promise<number[]>;
  updateWinner: () => Promise<void>;
  play: (squareId: number) => Promise<void>;
  storeCurrentImage: Promise<void>;
  generateGameEvol: Promise<void>;
};
