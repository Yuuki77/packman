import { IGrid, IEnemyController, ICellContent, ICell, ContentType, Direction } from '../interfaces/interfaces';
import { BreadthFirstPathFind } from './Pathfind';

export class EnemyController implements IEnemyController {
  readonly grid: IGrid;
  public player: ICellContent;
  public enemy: ICellContent;
  private pathFindLogic;
  private lastMove = 0;
  private lastDecide = 0;
  private path: ICell[];

  constructor(grid: IGrid, player: ICellContent, enemy: ICellContent) {
    this.grid = grid;
    this.player = player;
    this.enemy = enemy;
    this.pathFindLogic = new BreadthFirstPathFind(this.grid);
    this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
  }

  private PlayerPositionUpdated(updatedPlayerPosition: ICell): void {
    this.player = updatedPlayerPosition.Content;
  }

  public FindPathToPlayer(): void {
    let now = Date.now();

    // decide where to go
    if (this.lastDecide + 500 < now) {
      this.lastDecide = now;
      this.Decide();
    }

    // move
    if (this.lastMove + 200 < now) {
      this.lastMove = now;
      this.Move();
    }
  }

  private Decide() {
    let attack = Math.random() < 0.9;

    if (attack) {
      this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
    } else {
      this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
    }
    this.path = this.pathFindLogic.GetPath();
    this.path.shift();
  }

  private Move() {
    if (!this.path || this.path.length === 0) {
      return;
    }

    let dest = this.path.shift();
    let direction = this.GetDirection(this.grid, this.enemy, dest);
    this.grid.Move(this.enemy, direction);
  }

  public GetDirection(grid, content: ICellContent, position: ICell) {
    if (content.Cell.x + 1 === position.x) {
      return Direction.Right;
    } else if (content.Cell.x - 1 === position.x) {
      return Direction.Left;
    } else if (content.Cell.y + 1 === position.y) {
      return Direction.Down;
    } else if (content.Cell.y - 1 === position.y) {
      return Direction.Up;
    }
    console.warn('uncexpected position');
  }
}
