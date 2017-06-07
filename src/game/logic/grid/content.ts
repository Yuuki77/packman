import { ICellContent, ICell, EnemyType, Direction, IGrid, ContentType } from '../../interfaces/interfaces';

export abstract class Content implements ICellContent {
	private alive: boolean;
	private cell: ICell;
	private eaten: boolean = false;
	public previousCell: ICell;
	public grid: IGrid;
	private onMove: { (cell: ICell): void }[] = [];
	private onEaten: { (Eaten: boolean): void }[] = [];
	public abstract Type: ContentType;
	public abstract Id: string;

	readonly EnemyType: EnemyType | undefined = undefined;
	public x: number;
	public y: number;

	public get Cell() {
		return this.cell;
	}

	public set Cell(cell: ICell | undefined) {
		if (cell !== this.cell) {
			this.previousCell = this.cell;
			this.cell = cell;
		}

		if (this.previousCell === this.cell) {
			throw new Error('previous sell and current cell should not be same');
		}
		this.grid = this.cell.grid;
		this.x = cell.x;
		this.y = cell.y;


		if (cell !== undefined) {
			for (let cb of this.onMove) {
				cb(this.Cell);
			}
		}
	}

	public get Alive() {
		return this.alive;
	}

	public set Alive(currentStatus: boolean | undefined) {
		this.alive = currentStatus;
	}

	public AddEatenListner(cb: (eaten: boolean) => void) {
		this.onEaten.push(cb);
	}

	public get Eaten() {
		return this.eaten;
	}

	public set Eaten(currentStatus: boolean | undefined) {
		this.eaten = currentStatus;
		for (let cb of this.onEaten) {
			cb(this.eaten);
		}
	}


	public AddMoveListener(cb: (cell: ICell) => void) {
		this.onMove.push(cb);
	}

	public Move(cell: ICell) {
		if (this.Cell !== undefined) {
			for (let cb of this.onMove) {
				cb(this.Cell);
			}
		}
	}
}
