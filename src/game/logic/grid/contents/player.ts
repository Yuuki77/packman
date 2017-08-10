import { Helpers } from '../../../../test/helpers';
import { ContentType, Direction, FacilityType, ICell, ICellContent, ICellFacility, IPlayer, PLAYERY_NOMAL_SPPED, IStateManager, StateType } from '../../../interfaces/interfaces';
import { Content } from '../content';
import { Cherry } from '../facility/cherry';
import { Enemy } from './enemy';

export class Player extends Content implements IPlayer {
	public currentDirection: Direction = Direction.Left;
	public readonly type: ContentType = ContentType.Player;
	// tslint:disable-next-line:variable-name
	public helper;
	private lastMove = 0;
	public id = ' Player ';
	private onEatItem: Array<{ () }> = [];
	private onEat: Array<{ (enemy: ICellContent): void }> = [];
	private onPlayerEaten: Array<{ (): void }> = [];
	public isPlayable: boolean = true;
	public hasAnimationEnd: boolean = false;
	public stateManager: IStateManager;


	constructor(stateManager: IStateManager) {
		super();
		this.helper = new Helpers();
		this.stateManager = stateManager;
	}

	public EatItem() {
		for (let cb of this.onEatItem) {
			cb();
		}
	}

	public AddPackGumEatListener(cb: () => void) {
		this.onEatItem.push(cb);
	}

	private GetNextDirection(direction: Direction) {
		let nextCell = this.GetNextCell(this, direction);
		if (this.CannotMove(this, nextCell)) {
			return this.currentDirection;
		}
		return direction;
	}

	public Update(player: ICellContent, direction: Direction): void {
		let now = Date.now();

		this.currentDirection = this.GetNextDirection(direction);
		if (this.lastMove + PLAYERY_NOMAL_SPPED < now && this.stateManager.CurrentState !== StateType.Stop) {
			this.lastMove = now;
			this.Decide(player, direction);
		}
	}

	public Decide(player: ICellContent, direction: Direction) {
		let nextCell = this.GetNextCell(player, direction);
		if (this.CannotMove(player, nextCell)) {
			return;
		}

		// eat pacgum
		if (this.IsPackGum(nextCell)) {
			this.EatItem();
			nextCell.Facility.Visited = true;
			this.grid.Move(player, nextCell);
			return;
		}

		if (this.CanEatEnemy(nextCell)) {
			this.EatEnemy(nextCell.Content);
		}

		// visit dot
		if (this.CanVisitDot(nextCell)) {
			nextCell.Facility.Visited = true;
			this.grid.Move(player, nextCell);
			return;
		}

		// visit Item
		if (this.CanVisitItem(nextCell)) {
			this.EatSpecialItem(nextCell.Facility);
			nextCell.Facility.Visited = true;
			this.grid.Move(player, nextCell);
			return;
		}

		if (this.helper.IsEnemy(nextCell, ContentType.Enemy)) {
			let enemy = nextCell.Content as Enemy;
			if (enemy.Run) {
				this.EatEnemy(enemy);
			} else {
				this.stateManager.UpdateState(StateType.Stop);
				this.Alive = false;
			}
		}

		this.grid.Move(player, nextCell);
	}

	private CanVisitDot(nextCell: ICell): boolean {
		return nextCell.Facility && nextCell.Facility.type === FacilityType.YellowDot && !nextCell.Facility.Visited;
	}

	private CanVisitItem(nextCell: ICell): boolean {
		if (nextCell.Facility && nextCell.Facility.type === FacilityType.Cherry && !nextCell.Facility.Visited) {
			let cherry = nextCell.Facility as Cherry;
			return cherry.showed === true ? true : false;
		}
	}

	public GetNextCell(player: ICellContent, direction: Direction): ICell | undefined {
		let nextCell = player.Cell.GetNeightbor(direction);
		if (player.x === player.Cell.grid.width - 1 && !nextCell) {
			nextCell = player.Cell.grid.GetCell(0, player.y);
		} else if (player.x === 0 && !nextCell) {
			nextCell = player.Cell.grid.GetCell(player.Cell.grid.width - 1, player.y);
		}
		return nextCell;
	}

	private CanEatEnemy(cell: ICell) {
		if (!cell.Content) {
			return false;
		}

		if (cell.Content.type === ContentType.Enemy) {
			let enemy = cell.Content as Enemy;
			return enemy.Run;
		}
	}

	public CannotMove(content: ICellContent, nextCell: ICell): boolean {
		if (content.type !== ContentType.Player) {
			return true;
		}

		// check if cell is undefined
		if (nextCell === undefined) {
			return true;
		}

		// is there a wall
		if (this.helper.IsWall(nextCell)) {
			return true;
		}

		if (!nextCell.canPlayerVisit) {
			return true;
		}
		return false;
	}

	public IsPackGum(cell: ICell): boolean {
		return this.helper.IsThisFacility(cell, FacilityType.PackGum) && !cell.Facility.Visited;
	}

	public IsEnemy(cell: ICell): boolean {
		return this.helper.IsThisContent(cell, ContentType.Enemy);
	}

	public AddEatEnemyListener(cb: (enemy: ICellContent) => void) {
		this.onEat.push(cb);
	}

	public EatEnemy(enemy: ICellContent): void {
		if (enemy.type !== ContentType.Enemy) {
			throw new Error('it should be enemy' + enemy);
		}

		if (this.Cell !== undefined) {
			this.grid.scoreManager.EnemyEaten(enemy);
			for (let cb of this.onEat) {
				cb(enemy);
			}
		}
	}

	public EatSpecialItem(cherry: ICellFacility): void {
		if (cherry.type !== FacilityType.Cherry) {
			throw new Error('it should be cherry' + cherry);
		}
		this.grid.scoreManager.SpecialItemEaten(cherry);
	}

	public AddPlayerEatenListener(cb: () => void) {
		this.onPlayerEaten.push(cb);
	}

	public get Alive() {
		return this.alive;
	}

	public set Alive(currentStatus: boolean | undefined) {
		this.alive = currentStatus;
		for (let cb of this.onPlayerEaten) {
			cb();
		}
	}
}
