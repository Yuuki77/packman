import { ICellContent, ICell, ContentType, EnemyType, Direction, IGrid } from "../../interfaces/interfaces";

export abstract class Content implements ICellContent {
	private onMove: { (cell: ICell): void }[] = [];
	private onEat: { (cell: ICell): void }[] = [];
	private onEaten: { (cell: ICell): void }[] = [];
	private cell: ICell;
	private previousCell: ICell;
	private grid: IGrid;
	public abstract Type: ContentType;
	// todo something strange
	public readonly EnemyType: EnemyType | undefined = undefined;

	public Content(grid: IGrid) {
		this.grid = grid;
	}

	public get Cell() {
		return this.cell;
	}

	public set Cell(cell: ICell | undefined) {
		this.cell = cell;
		if (this.cell !== undefined) {
			for (let cb of this.onMove) {
				cb(this.cell);
			}
		}
	}

	public AddMoveListener(cb: (cell: ICell) => void) {
		this.onMove.push(cb);
	}

	public AddEatEnemyListener(cb: (cell: ICell) => void) {
		this.onEat.push(cb);
	}

	public EatEnemy(cell: ICellContent): void {
		if (this.cell !== undefined) {
			for (let cb of this.onEat) {
				cb(this.cell);
			}
		}
	}

	public Eaten(cell: ICellContent): void {

	}
}
