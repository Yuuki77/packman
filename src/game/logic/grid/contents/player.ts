import { ICellContent, ICell, ContentType, Direction } from '../../../interfaces/interfaces';
import { Content } from '../content';
import { Helpers } from "../../../../test/helpers";

export class Player extends Content {
	public readonly Type: ContentType = ContentType.Player;
	public Alive: boolean = true;
	public helper;
	private lastMove = 0;

	private onEatItem: { () }[] = [];

	constructor() {
		super();
		this.helper = new Helpers();
	}
	public EatItem() {
		if (this.Cell === undefined) {
			return;
		}
		for (let cb of this.onEatItem) {
			cb();
		}
	}

	public Update(player: ICellContent, direction: Direction): void {
		let now = Date.now();

		if (this.lastMove + 200 < now) {
			this.lastMove = now;
			this.Decide(player, direction);
		}
	}

	private Decide(player: ICellContent, direction: Direction) {
		let nextCell = this.GetNextCell(player, direction);
		if (this.CannotMove(player, nextCell)) {
			return;
		};

		// eat packgum
		if (IsThisPackGum()) {
			this.EatItem():
			this.grid.Move(player, nextCell);
			return;
		} 
	}

	public GetNextCell(player: ICellContent, direction: Direction) : ICell {
		let nextCell = player.Cell.GetNeightbor(direction);
		if (player.x === player.Cell.grid.width - 1 && !nextCell) {
			nextCell = player.Cell.grid.GetCell(0, player.y);
		} else if (player.x === 0 && !nextCell) {
			nextCell = player.Cell.grid.GetCell(player.Cell.grid.width - 1, player.y);
		}
		return nextCell;
	}

	public CannotMove(content: ICellContent, nextCell: ICell) {
		if (content.Type != ContentType.Player) {
			return false;
		}

		//check if there is a cell
		if (this.helper.IsUndefined(nextCell)) {
			return false;
		}

		// is there a wall
		if (this.helper.IsWall(nextCell)) {
			return false;
		}
	}
}