import { IGrid, ICellContent, ICell, ContentType, Direction, EnemyType } from '../interfaces/interfaces';
import { Cell } from './grid/cell';
import { Wall } from './grid/contents/wall';
import { Enemy } from './grid/contents/enemy';
import { Player } from './grid/contents/player';
import { Dot } from './grid/contents/dot';
import { ScoreManager } from '../score/scoreManager';
import { GridData } from '../const';

export class Grid implements IGrid {
	private grid: Cell[][];
	private onContentCreatedCallbacks: { (content: ICellContent): void; }[] = [];
	private data: number[][]
	public width: number = 0;
	public height: number = 0;
	public scoreManager: ScoreManager;

	constructor(GridData: number[][]) {
		this.data = GridData;
		this.scoreManager = new ScoreManager();
	}

	// todo
	public CreateBoard() {
		this.grid = [];
		this.height = this.data.length;
		this.width = this.data[0].length
		// Create Grid
		for (let y = 0; y < this.height; y++) {
			this.grid[y] = [];
			for (let x = 0; x < this.width; x++) {
				this.grid[y][x] = new Cell(this, x, y);
			}
		}

		// Add content
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.data[y][x] === 1) {
					this.CreateContent(ContentType.Wall, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 2) {
					this.CreateContent(ContentType.Enemy, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 3) {
					this.CreateContent(ContentType.Player, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 0) {
					this.CreateContent(ContentType.Dot, this.grid[y][x]);
					continue;
				}
				// // create enemy
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
			// todo change the logic 
			case ContentType.Enemy:
				content = new Enemy(EnemyType.Blue);
				break;
			case ContentType.Dot:
				content = new Dot();
				break;
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
		if (this.grid[y] == undefined) {
			return undefined;
		}
		return this.grid[y][x];
	}

	// TODO refactoring 
	public Move(content: ICellContent, direction: Direction) {
		let newCell = content.Cell.GetNeightbor(direction);
		let previousCell = content.Cell;
		
		if (previousCell.x === this.width -1 && !newCell) {
			newCell = this.GetCell(0, previousCell.y);
		} else if(previousCell.x === 0 && !newCell) {
			newCell = this.GetCell(this.width -1, previousCell.y);
		}

		if (newCell === undefined) {
			return console.warn("cannot move here");

		}
		else if (newCell.Content !== undefined && newCell.Content.Type !== ContentType.Dot) {
			previousCell.Content.Bitten(newCell.Content)
			return console.warn("collision between", content, newCell.Content);
		}
		else if (previousCell.Content.Type === ContentType.Player && !newCell.Visited) {
			newCell.Visited = true;
		}

		newCell.Content = previousCell.Content;
		
		if (previousCell !== undefined) {
			previousCell.Content = undefined;
		}
	}
}
