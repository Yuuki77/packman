import { ICellContent, ICell, EnemyType, Direction, IGrid, ContentType } from '../../interfaces/interfaces';

export abstract class Content implements ICellContent {
	private cell: ICell;
	private grid: IGrid;
	private onMove: { (cell: ICell): void }[] = [];
	private onEat: { (): void }[] = [];
	private onEaten: { (): void }[] = [];
	public abstract Type: ContentType;
	readonly EnemyType: EnemyType | undefined = undefined;

	// todo something strange
	public Content(grid: IGrid) {
		this.grid = grid;
	}

	public get Cell() {
		return this.cell;
	}

	public set Cell(cell: ICell | undefined) {
		this.cell = cell;
		if (cell !== undefined) {
			for (let cb of this.onMove) {
				cb(this.Cell);
			}
		}
	}

	public AddMoveListener(cb: (cell: ICell) => void) {
		this.onMove.push(cb);
	}

	public AddEatEnemyListener(cb: () => void) {
		this.onEat.push(cb);
	}

	public AddEatenLister(cb: () => void) {
		this.onEaten.push(cb);
	}

	public EatEnemy(): void {
		if (this.Cell !== undefined) {
			for (let cb of this.onEat) {
				cb();
			}
		}
	}

	public Eaten(): void {
		if (this.Cell !== undefined) {
			for (let cb of this.onEaten) {
				cb();
			}
		}
	}

	public Move(cell: ICell) {
		if (this.Cell !== undefined) {
			for (let cb of this.onMove) {
				cb(this.Cell);
			}
		}
	}
}
