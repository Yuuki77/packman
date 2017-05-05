import { IGrid, IEnemyManager, ICellContent, ICell, ContentType, Direction } from '../interfaces/interfaces';
import {BreadthFirstPathFind} from './Pathfind';
export class EnemyManager implements IEnemyManager {
  private player;
  private enemy;
  private pathFindLogic;
  private grid;
  constructor(grid, player: ICellContent, enemy :ICellContent) {
    this.grid = grid;
    this.player = player;
    this.enemy = enemy;
    this.pathFindLogic = new BreadthFirstPathFind();
    this.enemy.AddMoveListener((newCell: ICell) => this.playerPoisitionUpdated(newCell));
	}

  private playerPoisitionUpdated (updatedPlayerPosition :ICell) : void {
      this.enemy = updatedPlayerPosition.Content;
      console.log('this enemy', this.enemy);
  }

  public findPathToPlayer(): void {
    console.log('cell is', this.player.Cell, this.enemy.Cell);
    console.log('player is', this.player, this.enemy);
    this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
    let path = this.pathFindLogic.getPath();
    console.log('next path is ', path);
    console.log('path is ', path[1]);
    let direction = this.getDirection(this.grid, this.enemy, path[1]);
    console.log(direction);
    this.grid.Move(this.enemy, direction);


  }
  public getDirection(grid, content: ICellContent, position: ICell) {
    console.log('content', content, 'position', position);
    console.log(content.Cell);
    if (content.Cell.x +1 === position.x) {
      return Direction.Right;
    } else if(content.Cell.x -1 === position.x) {
      return Direction.Left;
    } else if (content.Cell.y + 1 === position.y) {
      return Direction.Down;
    } else if (content.Cell.y -1 === position.y) {
      return Direction.Up;
    } else {
      console.warn('uncexpected position');
    }
  }
}
