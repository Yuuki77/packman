import { ICellContent, IGrid, ICell, ContentType, IEnemyController, Direction, FacilityType, ENEMY_NOMAL_SPPED, ENEMY_RUN_AWAY_SPPED, ENEMY_GOHOME_SPPED, EnemyType, IAiManager } from '../../interfaces/interfaces';
import { PathFinding } from '../pathFind/pathFind';
import { Player } from '../grid/contents/player';
import { Enemy } from '../grid/contents/enemy';
import { AiManager } from '../Ai/aiManager';


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
	private lastSpecialTime = 0;
	private currentSteps = 0;
	private onEatSpecialItem: { (isSpecalItemTime: boolean): void }[] = [];

	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent, id: string) {
		this.grid = grid;
		this.player = player as Player;
		this.enemy = enemy as Enemy;
		this.id = id;
		this.player.AddMoveListener((newCell: ICell) => this.PlayerPositionUpdated(newCell));
		this.player.AddPackGumEatListener(() => this.SpecialItemEaten());
		this.player.AddEatEnemyListener((enemy: ICellContent) => this.EnemyEaten(enemy));
		this.pathFindLogic = new PathFinding(this.grid);
	}


	private PlayerPositionUpdated(updatedPlayerPosition: ICell): void {
		this.player = updatedPlayerPosition.Content as Player;
	}

	public Update(): void {
		let now = Date.now();

		// a lot of if makes me sad....
		// back to normal state.
		if (!this.IsSpecialTime() && this.specialItemEaten && this.enemy.Run && this.enemy.isPlayable) {
			this.specialItemEaten = false;
			this.enemy.Run = false;
			this.enemy.goHome = false;
		}

		if (this.enemy.goHome && this.enemy.isPlayable) {
			this.lastDecide = now;
			this.enemy.goHome = this.path.length === 1 ? false : true;
			this.Move();
			return;
		}

		// run away from player
		if (this.IsSpecialTime() && !this.enemy.goHome && this.enemy.isPlayable) {
			this.path = this.GetFarPath();
		}

		// decide where to goal
		if (this.CanDecide()) {
			this.lastDecide = now;
			this.Decide();
		}

		// move
		console.log('isplayable' + this.enemy.isPlayable);
		console.log('gohome' + this.enemy.goHome);
		if (this.enemy.isPlayable && !this.enemy.goHome) {
			this.Move();
		}
	}

	public Decide(): void {
		let attack = Math.random() < this.enemy.aiManager.Greedy;

		if (attack) {
			this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
		} else {
			this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
			return;
		}
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
	}

	public Move() {
		if (!this.path || this.path.length === 0) {
			this.Decide();
			return;
		}

		let dest = this.path[0];
		console.warn('move is called');
		if (dest) {
			if (this.CanMove(dest)) {
				// console.log(">>>>>", this.id, dest);
				dest = this.path.shift();
				this.enemy.isPlayable = false;
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

	public CanDecide(): boolean {
		if (!this.path || this.path.length === 1) {
			return true;
		}
		let now = Date.now();

		if (this.lastDecide + 500 > now || this.IsSpecialTime() || this.enemy.goHome) {
			return false;
		}
		return true;
	}

	// private GetReactTime(): number {
	// 	return ((1 - this.enemy.aiManager.Reactivity) * 0.1 + 2) * 1000;
	// }

	private SpecialItemEaten(): void {
		let now = Date.now();
		this.lastSpecialTime = now;
		this.specialItemEaten = true;
		this.path = this.GetFarPath();
		this.enemy.Run = true;
	}

	private EnemyEaten(enemy: ICellContent): void {

		if (enemy.EnemyType !== this.enemy.EnemyType) {
			return;
		}

		this.pathFindLogic.Dfs(this.grid.GetCell(13, 12), this.enemy.Cell);
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
		this.enemy.goHome = true;
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

	public GetCurrentSpeed(): number {
		return this.specialItemEaten === true ? ENEMY_RUN_AWAY_SPPED : ENEMY_NOMAL_SPPED;
	}
}
