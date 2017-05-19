import { IGrid, IEnemyController, ICellContent, ICell, ContentType, Direction, IEnemyManager, EnemyType } from '../../interfaces/interfaces';
import { PathFinding } from '../pathFind/pathFind';
import { RedEnemyController } from "./controllers/redController";
import { BlueEnemyController } from "./controllers/blueController";

export class EnemyManager implements IEnemyManager {
  public blueEnemyController: BlueEnemyController;
  public readonly grid: IGrid;
  public player: ICellContent;
  public enemyArray: ICellContent[] = [];;
  public enemyControllers : IEnemyController[] = [];

  constructor(grid: IGrid, player: ICellContent, enemyArray: ICellContent[]) {
    this.grid = grid;
    this.player = player;
    this.enemyArray = enemyArray;

    for (let enemy of this.enemyArray) {
      switch (enemy.EnemyType) {
        case EnemyType.Blue: 
          this.blueEnemyController = new BlueEnemyController(this.grid, this.player, enemy);
          this.enemyControllers.push(this.blueEnemyController);
      }
    }
  }
    Update(): void {
       for (let enemyController of this.enemyControllers) {
          enemyController.Update();
      }
  }
}


/*
import { IGrid, IEnemyController, ICellContent, ICell, ContentType, Direction, IEnemyManager } from '../../interfaces/interfaces';
import { PathFinding } from '../pathFind/pathFind';

export class EnemyManager implements IEnemyManager {
  public readonly redEnemy: ICellContent;
  public readonly blueEnemy: ICellContent;
  public readonly yellowEnemy: ICellContent;
  public readonly greedEnemy: ICellContent;
  readonly grid: IGrid;
  public player: ICellContent;
  public enemyArray: ICellContent [];
  private pathFindLogic;
  private lastMove = 0;
  private lastDecide = 0;
  private path: ICell[];

  constructor(grid: IGrid, player: ICellContent, enemy: ICellContent []) {
    this.grid = grid;
    this.player = player;
    this.enemyArray = enemy;
    this.pathFindLogic = new PathFinding(this.grid);
    this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
  }

  private PlayerPositionUpdated(updatedPlayerPosition: ICell): void {
    this.player = updatedPlayerPosition.Content;
  }

  public Update(): void {
    let now = Date.now();

    // decide where to goal
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

    for (let enemy of this.enemyArray) {
    let attack = Math.random() < 0.9;

    if (attack) {
      this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
    } else {
      this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
    }
    this.path = this.pathFindLogic.GetPath();
    this.path.shift();
  }
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

*/