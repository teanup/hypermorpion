import { Grid } from "./Grid";

export class Board {
  grids: Grid[] = [
    new Grid(), new Grid(), new Grid(),
    new Grid(), new Grid(), new Grid(),
    new Grid(), new Grid(), new Grid(),
  ];
  overallGrid = new Grid();
  winner: number | null = null;
}
