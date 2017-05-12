import { Grid } from '../game/logic/grid';
import { BreadthFirstPathFind } from '../game/logic/Pathfind';
import { ICellContent, IGrid, ICell,ContentType, Direction } from "../game/interfaces/interfaces";

export class Helpers {
  constructor() {

  }

  public getContent(grid: IGrid, contentName: ContentType) {

    for (var y = 0; y < grid.height; y++) {
      for (var x = 0; x < grid.width; x++) {
        // to do something wrong
        if (grid.GetCell(x, y).Content && grid.GetCell(x, y).Content.Type === contentName) {
          return grid.GetCell(x, y);
        }
      }
    }
    console.warn('uncexpected content', contentName);
    return undefined;
  }

  public findAllEnemys(grid: IGrid, contentName: ContentType) : ICell[]{
    let enemys :ICell [] = [];
    for (var y = 0; y < grid.height; y++) {
      for (var x = 0; x < grid.width; x++) {

        if (grid.GetCell(x, y).Content && grid.GetCell(x, y).Content.Type === contentName) {
          let enemy = grid.GetCell(x, y);
            enemys.push(enemy);
        }
      }
    }
    console.log("enemys" ,enemys);
    return enemys !== undefined ? enemys: undefined;
  }

  public assert(assertion) {
    if (!assertion) {
      throw new Error('this is undefined');
    }
  }
}
