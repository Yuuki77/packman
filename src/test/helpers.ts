import { Grid } from '../game/logic/grid';
import { BreadthFirstPathFind } from '../game/logic/Pathfind';
import { ICellContent,IGrid, ContentType, Direction } from "../game/interfaces/interfaces";

export class Helpers {
  constructor() {

  }

  public getContent(grid : IGrid, contentName : ContentType) {
    let width = 24;
    let height = 16;
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        // to do something wrong
        if (grid.GetCell(x,y).Content && grid.GetCell(x,y).Content.Type === contentName) {
          return grid.GetCell(x, y);
        }
      }
    }
    console.warn('uncexpected content');
    return undefined;
  }
}
