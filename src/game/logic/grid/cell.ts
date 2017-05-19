import { IGrid, ICellContent, ICell, ContentType, Direction } from '../../interfaces/interfaces';

export class Cell implements ICell {
	public readonly grid: IGrid;
	public readonly x: number;
	public readonly y: number;
	private content: ICellContent | undefined;
	private visited: boolean = false;
	private onVisitedDot: { (): void }[] = [];

	public get Visited(): boolean {
		return this.visited;
	}

	public set Visited(visited: boolean) {
		this.visited = visited;
		this.grid.scoreManager.Score = 10;
		for (let cb of this.onVisitedDot) {
			cb();
		}
	}

	public AddVistLietenr(cb: () => void) {
		this.onVisitedDot.push(cb);
	}

	public get Content(): ICellContent | undefined {
		return this.content;
	}

	public set Content(content: ICellContent | undefined) {
		this.content = content;

		if (this.content !== undefined) {
			this.content.Cell = this;
		}
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