import { ENEMY_NORMAL_SPEED, ENEMY_RUN_AWAY_SPEED, FacilityType, ICell, ICellContent, IEnemyController, IGrid, ContentType, IStateManager, StateType } from '../../interfaces/interfaces';
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
	public xt: number[];
	public yt: number[];
	private movingTimes: number = 0;
	public stateManager: IStateManager;

	// control random for testing purpose
	private random?: number;

	constructor(grid: IGrid, player: Player, enemy: Enemy, id: string) {
		this.grid = grid;
		this.player = player as Player;
		this.enemy = enemy as Enemy;
		this.id = id;
		this.RegisterEvent();

		this.pathFindLogic = new PathFinding(this.grid);
		// I think this is really bad idea for checking if is a home area.
		this.enemy.Cell.canPlayerVisit = false;
	}

	public get Random(): number {
		return this.random === undefined ? Math.random() : this.random;
	}
	public set Random(val: number) {
		this.random = val;
	}

	public get MovingTimes(): number {
		return this.movingTimes;
	}
	public set MovingTimes(val: number) {
		this.movingTimes = val;
	}

	private PlayerPositionUpdated(player: Player): void {
		this.player = player;
	}

	// todo refactoring
	public Update(dt: number): void {
		this.thinkingTime += dt;

		// back to normal state.
		if (!this.IsSpecialTime() && this.specialItemEaten && this.enemy.Run && this.enemy.isPlayable && !this.enemy.goHome
		) {
			this.specialItemEaten = false;
			this.enemy.Run = false;
			this.enemy.goHome = false;
		}

		if (this.enemy.goHome && this.enemy.isPlayable) {
			this.thinkingTime = 0;
			this.enemy.goHome = this.path.length <= 1 ? false : true;
			if (!this.enemy.goHome) {
				this.enemy.Run = false;
			}
			this.Move();
			return;
		}

		// run away from player
		if (this.IsSpecialTime() && !this.enemy.goHome && this.enemy.isPlayable) {
			this.path = this.GetFarPath();
		}

		// decide where to goal
		if (this.CanDecide() && this.enemy.isPlayable) {
			// set if walk around or not
			if (this.movingTimes % this.enemy.aiManager.Reactivity === 0) {
				this.Random = 1;
			} else if (this.movingTimes % 20 === 0 && this.random !== undefined) {
				this.Random = undefined;
			}

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

		this.movingTimes++;

		let dest = this.path[0];
		dest = this.path.shift();

		if (dest.Content) {
			console.log('dist content  type is', dest.Content.type as ContentType);
			console.log('is Player', dest.Content && dest.Content.type === ContentType.Player);
		}

		const canEatPlayer = dest.Content && dest.Content.type === ContentType.Player && !this.enemy.Run
		// if (dest.Content && dest.Content.type === ContentType.Player && !this.enemy.Run) {
		// 	this.player.Alive = false;
		// 	this.player.stateManager.UpdateState(StateType.Stop);
		// }

		// after checking is done,move the enemy
		this.enemy.isPlayable = false;
		this.grid.Move(this.enemy, dest);

		if (canEatPlayer) {
			this.player.Alive = false;
			this.player.stateManager.UpdateState(StateType.Stop);
		}
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

		if (this.IsHomeArea()) {
			return;
		}

		if (this.enemy.goHome) {
			return;
		}

		let now = Date.now();
		this.lastSpecialTime = now;
		this.specialItemEaten = true;
		this.path = this.GetFarPath();
		this.enemy.Run = true;
	}

	private EnemyEaten(enemy: ICellContent): void {
		if (enemy !== this.enemy) {
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

	// todo refactoring maybe using length of vector
	public GetFarPath(): ICell[] {
		let neighbors = this.enemy.Cell.GetNeighbors();
		let farPath: ICell[];
		for (let neighbor of neighbors) {

			// check if it is wall or another content
			if ((neighbor.Facility && neighbor.Facility.type === FacilityType.Wall) || neighbor.Content || this.enemy.previousCell === neighbor) {
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
		return this.specialItemEaten === true ? ENEMY_RUN_AWAY_SPEED : ENEMY_NORMAL_SPEED;
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
			if ((possiblePosition.Facility && possiblePosition.Facility.type === FacilityType.Wall) || possiblePosition.Content || this.enemy.previousCell === possiblePosition) {
				continue;
			}
			nextPosition = possiblePosition;
			return nextPosition;
		}
		return this.enemy.previousCell;
	}

	public IsHomeArea(): boolean {
		let currentPosition: ICell = this.grid.GetCell(this.enemy.x, this.enemy.y);
		return !currentPosition.canPlayerVisit;
	}

	public RegisterEvent(): void {
		this.player.AddMovedListener((cell: ICell) => this.PlayerPositionUpdated(this.player));
		this.player.AddPackGumEatListener(() => this.SpecialItemEaten());
		this.player.AddEatEnemyListener((enemyContent: ICellContent) => this.EnemyEaten(enemyContent));
	}
}
