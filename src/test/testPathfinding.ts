import { Grid } from '../game/logic/grid';
import { BreadthFirstPathFind } from '../game/logic/Pathfind';
import { ICellContent, ContentType, Direction } from "../game/interfaces/interfaces";
import {Helpers}  from "./helpers";

export class TestPathfinding {
  game;
  player : ICellContent;
  enemy : ICellContent;
  helpers;
  constructor(game:Phaser.Game) {
  this.game = game;
  this.helpers = new Helpers();
  this.testBfs();
  }

  public testBfs(): void{
    let grid = new Grid();
    grid.CreateBoard();
    let player = this.helpers.getContent(grid, ContentType.Player);
    let enemy = this.helpers.getContent(grid, ContentType.Enemy);
    let breadthFirstPathFind = new BreadthFirstPathFind();

    console.log(player, enemy, "you got it?");
    console.log(breadthFirstPathFind.Dfs(player, enemy));
    console.log('get path is ',breadthFirstPathFind.getPath());
  }
}
