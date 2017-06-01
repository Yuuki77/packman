import { ICellContent, IGrid, ICell, ContentType, IEnemyController, Direction } from "../../interfaces/interfaces";
import { PathFinding } from "../pathFind/pathFind";
import { Player } from "../grid/contents/player";

export abstract class EnemyController implements IEnemyController {
	public readonly grid: IGrid;
	public player: Player;
	public enemy: ICellContent;
	private pathFindLogic;
	private lastMove = 0;
	private lastDecide = 0;
	private path: ICell[];
	private id: string;
	private specialItemEaten: boolean = false;
	private lastSpecialTime = 0;


	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent, id: string) {
		this.grid = grid;
		this.player = player as Player;
		this.enemy = enemy;
		this.id = id;
		this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
		this.player.AddPackGumEatListener(() => this.SpecialItemEaten());
		this.pathFindLogic = new PathFinding(this.grid)
	}


	private PlayerPositionUpdated(updatedPlayerPosition: ICell): void {
		this.player = updatedPlayerPosition.Content as Player;
	}

	public Update(): void {
		let now = Date.now();

		// console.log(this.IsSpecialTime());
		// if (this.IsSpecialTime()) {
		// 	this.Move();
		// 	return;
		// }
		// decide where to goal
		if (this.lastDecide + 500 < now && !this.IsSpecialTime()) {
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
		if (dest) {
			if (this.CanMove(dest)) {
				// console.log(">>>>>", this.id, dest);
				dest = this.path.shift();
				this.grid.Move(this.enemy, dest);
			} else {
				// console.log(">>>>> cant move", this.id, dest, dest.Content);
			}
		} else {
			console.warn("Attempting to move without dest.");
		}
	}

	public CanMove(dest: ICell): boolean {
		if (dest.Content) {
			return dest.Content.Type !== ContentType.Enemy;
		}
		return true;
	}

	private SpecialItemEaten(): void {
		let now = Date.now();
		this.lastSpecialTime = now;
		this.specialItemEaten = true;
		this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
	}

	private IsSpecialTime(): boolean {
		let now = Date.now();
		if (this.lastSpecialTime + 10000 < now) {
			this.specialItemEaten = false;
			return false;
		} else if (this.specialItemEaten) {
			return true;
		}
		return false;
	}
}
