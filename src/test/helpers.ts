import { Grid } from '../game/logic/grid';
import { BreadthFirstPathFind } from '../game/logic/Pathfind';
import { ICellContent, IGrid, ContentType, Direction } from "../game/interfaces/interfaces";

export class Helpers {
  constructor() {

  }

  public getContent(grid: IGrid, contentName: ContentType) {

    for (var y = 0; y < grid.height; y++) {
      for (var x = 0; x < grid.width; x++) {
        // to do something wrong
        console.log(grid.GetCell(x, y));
        if (grid.GetCell(x, y).Content && grid.GetCell(x, y).Content.Type === contentName) {
          return grid.GetCell(x, y);
        }
      }
    }
    console.warn('uncexpected content', contentName);
    return undefined;
  }
}
