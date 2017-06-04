import { ICellContent, ICell, ContentType, Direction, IPlayer, FacilityType } from '../../../interfaces/interfaces';
import { Content } from '../content';
import { Helpers } from '../../../../test/helpers';
import { Enemy } from "./enemy";

export class Player extends Content implements IPlayer {
	public readonly Type: ContentType = ContentType.Player;
	public Alive: boolean = true;
	public helper;
	private lastMove = 0;
	public Id = 'Player';
	private onEatItem: { () }[] = [];

	constructor() {
		super();
		this.helper = new Helpers();
	}

	public EatItem() {
		for (let cb of this.onEatItem) {
			cb();
		}
	}

	public AddPackGumEatListener(cb: () => void) {
		this.onEatItem.push(cb);
	}

	public Update(player: ICellContent, direction: Direction): void {
		let now = Date.now();

		// if (this.lastMove + 200 < now) {
		this.lastMove = now;
		this.Decide(player, direction);
		// }
	}

	public Decide(player: ICellContent, direction: Direction) {
		let nextCell = this.GetNextCell(player, direction);
		if (this.CannotMove(player, nextCell)) {
			return;
		};

		// eat packgum
		if (this.IsPackGum(nextCell)) {
			this.EatItem();
			nextCell.Facility.Visited = true;
			this.grid.Move(player, nextCell);
			return;
		}

		let enemy = nextCell.Content as Enemy;
		if (this.IsEnemy(nextCell) && enemy.Run) {
			this.EatEnemy(nextCell);
		}

		// visit dot
		if (this.CanVisitDot(nextCell)) {
			nextCell.Facility.Visited = true;
			this.grid.Move(player, nextCell);
			return;
		}

		if (this.helper.IsThisContent(nextCell, ContentType.Enemy)) {
			throw new Error('It is not implemented yet');
		}

		this.grid.Move(player, nextCell);
	}

	private CanVisitDot(nextCell: ICell): boolean {
		return nextCell.Facility && nextCell.Facility.Type === FacilityType.YellowDot && !nextCell.Facility.Visited;
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

	public CannotMove(content: ICellContent, nextCell: ICell): boolean {
		if (content.Type !== ContentType.Player) {
			return true;
		}

		// check if there is a cell
		if (this.helper.IsUndefined(nextCell)) {
			return true;
		}

		// is there a wall
		if (this.helper.IsWall(nextCell)) {
			return true;
		}
	}

	public IsPackGum(cell: ICell): boolean {
		return this.helper.IsThisFacility(cell, FacilityType.PackGum) && !cell.Facility.Visited;
	}

	public IsEnemy(cell: ICell): boolean {
		return this.helper.IsThisContent(cell, ContentType.Enemy);
	}
}