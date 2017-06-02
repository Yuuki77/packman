import { IGrid, ICellContent, ICell, Direction, ICellFacility } from '../../interfaces/interfaces';

export class Cell implements ICell {
	public readonly grid: IGrid;
	public readonly x: number;
	public readonly y: number;
	private content: ICellContent | undefined;
	private facility: ICellFacility | undefined;

	public get Content(): ICellContent | undefined {
		return this.content;
	}

	public set Content(content: ICellContent | undefined) {
		this.content = content;

		if (this.content !== undefined) {
			this.content.Cell = this;
		}
	}
	public get Facility(): ICellFacility | undefined {
		return this.facility;
	}

	public set Facility(facility: ICellFacility | undefined) {
		this.facility = facility;
		if (this.facility !== undefined) {
			this.facility.Cell = this;
		}
		this.facility = facility;
	}

	constructor(grid: IGrid, x: number, y: number) {
		this.grid = grid;
		this.x = x;
		this.y = y;
	}

	public GetNeightbor(direction: Direction): ICell | undefined {
		switch (direction) {
			case Direction.Up:
				return this.grid.GetCell(this.x, this.y - 1);
			case Direction.Down:
				return this.grid.GetCell(this.x, this.y + 1);
			case Direction.Left:
				return this.grid.GetCell(this.x - 1, this.y);
			case Direction.Right:
				return this.grid.GetCell(this.x + 1, this.y);
			default:
				throw new Error('unexpected direction');
		}
	}

	public GetNeightbors(): ICell[] {
		let neightbors: ICell[] = [];

		let up = this.GetNeightbor(Direction.Up);
		if (up !== undefined) {
			neightbors.push(up);
		}

		let down = this.GetNeightbor(Direction.Down);
		if (down !== undefined) {
			neightbors.push(down);
		}

		let left = this.GetNeightbor(Direction.Left);
		if (left !== undefined) {
			neightbors.push(left);
		}

		let right = this.GetNeightbor(Direction.Right);
		if (right !== undefined) {
			neightbors.push(right);
		}

		return neightbors;
	}
}