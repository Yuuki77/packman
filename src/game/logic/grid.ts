import { IGrid, ICellContent, ICell, ContentType, Direction } from '../interfaces/interfaces';

export class Grid implements IGrid {
	private grid: Cell[][];
	private onContentCreatedCallbacks: { (content: ICellContent): void; }[] = [];

	constructor() {
		// this.data = data;
	}

	// TODO: Good job yuki
	public CreateBoard() {
		let width = 24;
		let height = 16;
		this.grid = [];

		// Create Grid
		for (let x = 0; x < width; x++) {
			this.grid[x] = [];
			for (let y = 0; y < height; y++) {
				this.grid[x][y] = new Cell(this, x, y);
			}
		}

		// Add content
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
					this.CreateContent(ContentType.Wall, this.grid[x][y]);
					return;
				}

				if (y === 8 && (x > 3 && x < 20)) {
					this.CreateContent(ContentType.Wall, this.grid[x][y]);
					return;
				}

				if (y == 3 && x == 12) {
					this.CreateContent(ContentType.Player, this.grid[x][y]);
					return;
				}
				// create enemy
			  if (y === 10 && x === 2) {
				 this.CreateContent(ContentType.Enemy, this.grid[x][y]);
				 return;
				}
				this.CreateContent(ContentType.Dot, this.grid[x][y]);
				return;
			}
		}
	}

	public AddContentCreatedListener(cb: (content: ICellContent) => void) {
		this.onContentCreatedCallbacks.push(cb);
	}

	private CreateContent(type: ContentType, cell: ICell) {
		let content;
		switch (type) {
			case ContentType.Wall:
				content = new Wall();
				break;
			case ContentType.Player:
				content = new Player();
				break;
			case ContentType.Enemy:
				content = new Enemy();
				break;
			case ContentType.Dot;
			content = new Dot();
			default:
				console.error('un known type', type);
				return;
		}

		cell.Content = content;
		for (let cb of this.onContentCreatedCallbacks) {
			cb(content);
		}
		return content;
	}

	public GetCell(x: number, y: number): ICell | undefined {
		if (this.grid[x] == undefined) {
			return undefined;
		}
		return this.grid[x][y];
	}

	public Move(content: ICellContent, direction: Direction) {
		let newCell = content.Cell.GetNeightbor(direction);
		if (newCell === undefined) {
			console.warn("cannot move here");
			return;
		}

		if (newCell.Content !== undefined) {
			console.warn("collision between", content, newCell.Content);
			return;
		}

		let previousCell = content.Cell;
		newCell.Content = content;
		if (previousCell !== undefined) {
			previousCell.Content = undefined;
		}
	}
}

export class Cell implements ICell {
	public readonly grid: IGrid;
	public readonly x: number;
	public readonly y: number;
	private content: ICellContent | undefined;
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
				return this.grid.GetCell(this.x, this.y-1);
			case Direction.Down:
				return this.grid.GetCell(this.x, this.y+1);
			case Direction.Left:
				return this.grid.GetCell(this.x-1, this.y);
			case Direction.Right:
				return this.grid.GetCell(this.x+1, this.y);
		}
	}

	public GetNeightbors(): ICell[] {
		let neightbors: ICell[] = [];

		let up =this.GetNeightbor(Direction.Up);
		if (up !== undefined) {
			neightbors.push(up);
		}

		let down =this.GetNeightbor(Direction.Down);
		if (down !== undefined) {
			neightbors.push(down);
		}

		let left =this.GetNeightbor(Direction.Left);
		if (left !== undefined) {
			neightbors.push(left);
		}

		let right =this.GetNeightbor(Direction.Right);
		if (right !== undefined) {
			neightbors.push(right);
		}

		return neightbors;
	}
}

export class Wall implements ICellContent {
	private onMove: { (cell: ICell): void; }[] = [];
	public readonly Type: ContentType = ContentType.Wall;
	private cell: ICell;
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
}

export class Player implements ICellContent {
	private onMove: { (cell: ICell): void; }[] = [];
	public readonly Type: ContentType = ContentType.Player;
	private cell: ICell;
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
		console.log('player', this.cell);
	}

	public AddMoveListener(cb: (cell: ICell) => void) {
		this.onMove.push(cb);
	}
}

export class Enemy implements ICellContent {
	private onMove: {(cell : ICell): void }[] =[];
	private cell: ICell;
	public readonly Type :ContentType = ContentType.Enemy;

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
		console.log('enemy', this.cell);
	}

	public AddMoveListener(cb: (cell: ICell) => void) {
		this.onMove.push(cb);
	}
}

export class Dot implements ICellContent {
	private onMove: {(cell : ICell): void }[] =[];
	private cell: ICell;
	public readonly Type :ContentType = ContentType.Dot;

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
		console.log('enemy', this.cell);
	}

	public AddMoveListener(cb: (cell: ICell) => void) {
		this.onMove.push(cb);
	}
}
