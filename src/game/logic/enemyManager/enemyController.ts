import { ICellContent, IGrid, ICell, ContentType, IEnemyController, Direction, FacilityType } from '../../interfaces/interfaces';
import { PathFinding } from '../pathFind/pathFind';
import { Player } from '../grid/contents/player';
import { Enemy } from '../grid/contents/enemy';

export abstract class EnemyController implements IEnemyController {
	public readonly grid: IGrid;
	public player: Player;
	public enemy: Enemy;
	private pathFindLogic;
	private lastMove = 0;
	private lastDecide = 0;
	private path: ICell[];
	private id: string;
	private specialItemEaten: boolean = false;
	private goHome: boolean = false;
	private lastSpecialTime = 0;
	private onEatSpecialItem: { (isSpecalItemTime: boolean): void }[] = [];

	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent, id: string) {
		this.grid = grid;
		this.player = player as Player;
		this.enemy = enemy as Enemy;
		this.id = id;
		this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
		this.player.AddPackGumEatListener(() => this.SpecialItemEaten());
		this.player.AddEatEnemyListener(() => this.EnemyEaten());
		this.pathFindLogic = new PathFinding(this.grid);
	}


	private PlayerPositionUpdated(updatedPlayerPosition: ICell): void {
		this.player = updatedPlayerPosition.Content as Player;
	}

	public Update(): void {
		let now = Date.now();

		// a lot of if makes me sad....
		if (!this.IsSpecialTime() && this.specialItemEaten === true && this.enemy.Run === true) {
			this.specialItemEaten = false;
			this.enemy.Run = false;
		}

		if (this.goHome && this.lastDecide + 80 < now) {
			this.lastDecide = now;
			this.goHome = this.path.length === 1 ? false : true;
			this.Move();
			return;
		}

		//
		if (this.IsSpecialTime() && !this.goHome) {
			this.path = this.GetFarPath();
		}


		// decide where to goal
		if (this.lastDecide + 500 < now && !this.IsSpecialTime() && !this.goHome) {
			this.lastDecide = now;
			this.Decide();
		}

		// move
		if (this.lastMove + 200 < now && !this.goHome) {
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
			console.warn('Attempting to move without dest.');
		}
	}

	public CanMove(dest: ICell): boolean {
		if (dest.Content) {
			return false;
		}
		return true;
	}

	private SpecialItemEaten(): void {
		let now = Date.now();
		this.lastSpecialTime = now;
		this.specialItemEaten = true;
		this.path = this.GetFarPath();
		this.enemy.Run = true;
	}

	private EnemyEaten(): void {
		this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
		this.goHome = true;
		this.enemy.Eaten = true;
	}

	private IsSpecialTime(): boolean {
		let now = Date.now();
		if (this.lastSpecialTime + 10000 < now) {
			return false;
		} else if (this.specialItemEaten) {
			return true;
		}

		return false;
	}

	// todo refactoring
	public GetFarPath(): ICell[] {
		let neightbors = this.enemy.Cell.GetNeightbors();
		let farPath: ICell[];
		for (let neighbor of neightbors) {

			// check if it is wall or another content
			if ((neighbor.Facility && neighbor.Facility.Type === FacilityType.Wall) || neighbor.Content || this.enemy.previousCell === neighbor) {
				continue;
			}

			this.pathFindLogic.Dfs(this.player.Cell, neighbor);
			let path: ICell[] = this.pathFindLogic.GetPath();
			if (!farPath || path.length > farPath.length) {
				farPath = path;
			}
		}

		return farPath;
	}
}
