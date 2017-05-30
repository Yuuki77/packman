import { ICellContent, IGrid, ICell, ContentType, IEnemyController, Direction } from "../../interfaces/interfaces";
import { PathFinding } from "../pathFind/pathFind";

export abstract class EnemyController implements IEnemyController {
	public readonly grid: IGrid;
	public player: ICellContent;
	public enemy: ICellContent;
	private pathFindLogic;
	private lastMove = 0;
	private lastDecide = 0;
	private path: ICell[];
	private id: string;

	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent, id: string) {
		this.grid = grid;
		this.player = player;
		this.enemy = enemy;
		this.id = id;
		this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
		this.pathFindLogic = new PathFinding(this.grid)
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

	public Decide(): void {
		let attack = Math.random() < 0.9;

		if (attack) {
			this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
		} else {
			this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
		}
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
	}

	public Move() {
		if (!this.path || this.path.length === 0) {
			return;
		}

		let dest = this.path[0];
		let value = this.enemy.Cell === dest;
		console.log(this.id, value);
		if (dest) {
			if (this.CanMove(dest)) {
				console.log(">>>>>", this.id, dest);
				dest = this.path.shift();
				this.grid.Move(this.enemy, dest);
			} else {
				console.log(">>>>> cant move", this.id, dest, dest.Content);
			}
		} else {
			console.warn("Attempting to move without dest.");
		}
	}

	public CanMove(dest: ICell): boolean {
		console.warn(dest);
		if (dest.Content) {
			console.warn(dest.Content.EnemyType, ContentType.Enemy);
			return dest.Content.Type !== ContentType.Enemy;
		}
		return true;
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
