import { ENEMY_NOMAL_SPPED, ENEMY_RUN_AWAY_SPPED, FacilityType, ICell, ICellContent, IEnemyController, IGrid } from '../../interfaces/interfaces';
import { Enemy } from '../grid/contents/enemy';
import { Player } from '../grid/contents/player';
import { PathFinding } from '../pathFind/pathFind';

export abstract class EnemyController implements IEnemyController {
	public readonly grid: IGrid;
	public player: Player;
	public enemy: Enemy;
	private pathFindLogic;
	public thinkingTime = 0;
	private path: ICell[];
	private id: string;
	private specialItemEaten = false;
	private lastSpecialTime = 0;
	public xt;
	public yt;

	// control random for testing purpose
	private random?: number;
	public get Random(): number {
		return this.random === undefined ? Math.random() : this.random;
	}
	public set Random(val: number) {
		this.random = val;
	}

	constructor(grid: IGrid, player: Player, enemy: Enemy, id: string) {
		this.grid = grid;
		this.player = player as Player;
		this.enemy = enemy as Enemy;
		this.id = id;
		this.player.AddMoveListener((player: Player) => this.PlayerPositionUpdated(player));
		this.player.AddPackGumEatListener(() => this.SpecialItemEaten());
		this.player.AddEatEnemyListener((enemyContent: ICellContent) => this.EnemyEaten(enemyContent));
		this.pathFindLogic = new PathFinding(this.grid);
	}

	private PlayerPositionUpdated(player: Player): void {
		this.player = player;
	}

	// todo refactoring
	public Update(dt: number): void {
		this.thinkingTime += dt;

		// a lot of if makes me sad....
		// back to normal state.
		if (!this.IsSpecialTime() && this.specialItemEaten && this.enemy.Run && this.enemy.isPlayable) {
			this.specialItemEaten = false;
			this.enemy.Run = false;
			this.enemy.goHome = false;
		}

		if (this.enemy.goHome && this.enemy.isPlayable) {
			this.thinkingTime = 0;
			this.enemy.goHome = this.path.length <= 1 ? false : true;
			this.Move();
			return;
		}

		// run away from player
		if (this.IsSpecialTime() && !this.enemy.goHome && this.enemy.isPlayable) {
			this.path = this.GetFarPath();
		}

		// decide where to goal
		if (this.CanDecide() && this.enemy.isPlayable) {
			this.thinkingTime = 0;
			this.Decide();
		}

		// move
		if (this.enemy.isPlayable && !this.enemy.goHome) {
			this.Move();
		}
	}

	public Decide(): void {
		let attack = this.Random < this.enemy.aiManager.Greedy;
		if (attack) {
			this.pathFindLogic.Dfs(this.player.Cell, this.enemy.Cell);
		} else {
			let nextPos = this.GetWalkingAroundNextCell();
			if (!nextPos) {
				return;
			}
			this.pathFindLogic.Dfs(this.GetWalkingAroundNextCell(), this.enemy.Cell);
		}
		this.path = this.pathFindLogic.GetPath();
		this.path.shift();
	}

	// to do refactoring
	public Move() {
		if (!this.path || this.path.length === 0) {
			this.Decide();
			return;
		}

		let dest = this.path[0];
		if (this.CanMove(dest)) {
			// console.log(">>>>>", this.id, dest);
			dest = this.path.shift();
			this.enemy.isPlayable = false;
			this.grid.Move(this.enemy, dest);
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

		if (this.GetReactTime() > this.thinkingTime || this.IsSpecialTime() || this.enemy.goHome) {
			return false;
		}
		return true;
	}

	private GetReactTime(): number {
		return ((1 - this.enemy.aiManager.Reactivity) * 0.1 + 1) * 20;
	}

	private SpecialItemEaten(): void {
		let now = Date.now();
		this.lastSpecialTime = now;
		this.specialItemEaten = true;
		this.path = this.GetFarPath();
		this.enemy.Run = true;
	}

	private EnemyEaten(enemy: ICellContent): void {
		if (enemy.enemyType !== this.enemy.enemyType) {
			throw new Error('unexpected enemy eaten');
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

	public GetWalkingAroundNextCell(): ICell {
		let nextPosition: ICell;
		for (let i = 0; i < 4; i++) {
			let x = this.enemy.x + this.xt[i];
			let y = this.enemy.y + this.yt[i];
			let possiblePosition = this.grid.GetCell(x, y);

			if (!possiblePosition) {
				continue;
			}
			if ((possiblePosition.Facility && possiblePosition.Facility.Type === FacilityType.Wall) || possiblePosition.Content || this.enemy.previousCell === possiblePosition) {
				continue;
			}
			nextPosition = possiblePosition;
			return nextPosition;
		}
		return this.enemy.previousCell;
	}
}
