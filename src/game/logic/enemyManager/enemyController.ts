import { ICellContent, IGrid, ICell, IEnemyController, Direction, ContentType, FacilityType } from '../../interfaces/interfaces';
import { PathFinding } from '../pathFind/pathFind';

export abstract class EnemyController implements IEnemyController {
	public readonly grid: IGrid;
	public player: ICellContent;
	public enemy: ICellContent;
	private pathFindLogic;
	private lastMove = 0;
	private lastDecide = 0;
	private path: ICell[];
	private nextCell: ICell;

	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent, ) {
		this.grid = grid;
		this.player = player;
		this.enemy = enemy;
		this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
		this.pathFindLogic = new PathFinding(this.grid);
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
			// TODO think about this.
			let nextCell = this.GetNextCell();
			this.DoNextAction(nextCell);
		}
	}

	public Decide(): void {
		let attack = Math.random() < 0.9;

		if (attack) {
			this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
		} else {
			this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
		}
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
		console.log(this.path.map(x => x.x.toString() + x.y.toString()));
	}

	public GetNextCell(): ICell {
		let dest = this.path.shift();
		return dest;
	}

	public DoNextAction(nextCell: ICell) {
		console.log("do next action is called");
		if (!nextCell || this.path.length === 0) {
			return;
		}

		if (this.CanNotMove(nextCell)) {
			return;
		}

		if (nextCell === undefined) {
			throw new Error();
		}
		this.grid.Move(this.enemy, nextCell);
	}

	public CanNotMove(nextCell: ICell): boolean {
		if (this.IsEnemy(nextCell)) {
			return true;
		}
		else if (this.IsWall(nextCell)) {
			return true;
		}
		return false;
	}

	private IsEnemy(cell: ICell): boolean {
		
		return cell.Content && cell.Content.Type === ContentType.Enemy;
	}

	private IsWall(cell: ICell): boolean {
		return cell.Content && cell.Facility.Type === FacilityType.Wall;
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
