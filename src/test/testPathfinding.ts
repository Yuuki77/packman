import { Grid } from '../game/logic/grid';
import { ICellContent, ContentType, Direction } from "../game/interfaces/interfaces";
import { PathFinding } from "../game/logic/pathFind/pathFind";

import { Helpers } from "./helpers";
import { GridData } from "../game/const";

export class TestPathfinding {
  game;
  player: ICellContent;
  enemy: ICellContent;
  helpers;
  constructor(game: Phaser.Game) {
    this.game = game;
    this.helpers = new Helpers();
    this.testBfs();
    this.testBfs2();
  }

  public testBfs(): void {
    let grid = new Grid(GridData);
    grid.CreateBoard();
    let player = this.helpers.getContent(grid, ContentType.Player);
    let enemy = this.helpers.getContent(grid, ContentType.Enemy);
    let breadthFirstPathFind = new PathFinding(grid);
    // todo assertion.

    this.helpers.assert(player);
    this.helpers.assert(enemy);
    this.helpers.assert(breadthFirstPathFind);

    console.log(player, enemy, "you got it?");
    console.log(breadthFirstPathFind.Dfs(player, enemy));
    console.log('get path is ', breadthFirstPathFind.GetPath());
  }

  public testBfs2() :void {
    let grid = new Grid(GridData);
    let paths = [];
    grid.CreateBoard();
    let player = this.helpers.getContent(grid, ContentType.Player);
    let enemysArray = this.helpers.findAllEnemys(grid, ContentType.Enemy);
    let breadthFirstPathFind = new PathFinding(grid);

    this.helpers.assert(player);
    this.helpers.assert(enemysArray);

    for (let enemy of enemysArray) {
        breadthFirstPathFind.Dfs(player, enemy)
        paths.push(breadthFirstPathFind.GetPath());
    };
    console.log("path is ", paths);
  }
}
