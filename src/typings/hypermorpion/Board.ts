import { GridType } from "./Grid";

export type BoardType = {
  grids: GridType[];
  overallGrid: GridType;
  winner: number | null;
};
