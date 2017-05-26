import { IGrid, ICellContent, ICell, Direction, EnemyType, ContentType, FacilityType, ICellFacility } from '../interfaces/interfaces';
import { Cell } from './grid/cell';
import { Wall } from './grid/facility/wall';
import { Enemy } from './grid/contents/enemy';
import { Player } from './grid/contents/player';
import { ScoreManager } from '../score/scoreManager';
import { GridData } from '../const';
import { YellowDot } from './grid/facility/yellowDot';
import { PackGum } from './grid/facility/packGum';
import { Helpers } from "../../test/helpers";


export class Grid implements IGrid {
	private grid: Cell[][];
	private onFacilityCreatedCallbacks: { (facility: ICellFacility): void; }[] = [];
	private onContentCreatedCallbacks: { (content: ICellContent): void; }[] = [];
	private data: number[][];
	public width: number = 0;
	public height: number = 0;
	public scoreManager: ScoreManager;
	private helper: Helpers;

	constructor(GridData: number[][]) {
		this.data = GridData;
		this.scoreManager = new ScoreManager();
		this.helper = new Helpers();
	}

	// todo
	public CreateBoard() {
		this.grid = [];
		this.height = this.data.length;
		this.width = this.data[0].length;
		// Create Grid
		for (let y = 0; y < this.height; y++) {
			this.grid[y] = [];
			for (let x = 0; x < this.width; x++) {
				this.grid[y][x] = new Cell(this, x, y);
			}
		}

		// Add content or ui
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.data[y][x] === 1) {
					this.CreateFacility(FacilityType.Wall, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 2) {
					this.CreateContent(ContentType.Enemy, this.grid[y][x]);
					continue;
				}


				if (this.data[y][x] === 4) {
					this.CreateContent(ContentType.Enemy, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 5) {
					this.CreateContent(ContentType.Enemy, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 6) {
					this.CreateContent(ContentType.Enemy, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 3) {
					this.CreateContent(ContentType.Player, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 0) {
					this.CreateFacility(FacilityType.YellowDot, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 7) {
					this.CreateFacility(FacilityType.PackGum, this.grid[y][x]);
					continue;
				}
			}
		}
	}

	public AddContentCreatedListener(cb: (content: ICellContent) => void) {
		this.onContentCreatedCallbacks.push(cb);
	}

	public AddFacilityCreateListener(cb: (facility: ICellFacility) => void) {
		this.onFacilityCreatedCallbacks.push(cb);
	}

	public CreateFacility(type: FacilityType, cell: ICell) {
		let facility;
		switch (type) {
			case FacilityType.Wall:
				facility = new Wall();
				break;
			case FacilityType.YellowDot:
				facility = new YellowDot();
				break;
			case FacilityType.PackGum:
				facility = new PackGum();
				break;
			default:
				console.error('un known type', type);
		}
		cell.Facility = facility;
		facility.Cell = cell;
		for (let cb of this.onFacilityCreatedCallbacks) {
			cb(facility);
		}
		return facility;
	}

	private CreateContent(type: ContentType, cell: ICell): void {
		let content;
		switch (type) {
			case ContentType.Player:
				content = new Player();
				break;
			// todo change the logic
			case ContentType.Enemy:
				content = this.GetEnemy(cell);
				break;
			default:
				console.error('un known type', type);
		}

		cell.Content = content;
		content.cell = cell;
		for (let cb of this.onContentCreatedCallbacks) {
			cb(content);
		}
		return content;
	}

	public GetCell(x: number, y: number): ICell | undefined {
		if (this.grid[y] === undefined) {
			return undefined;
		}
		return this.grid[y][x];
	}

	// TODO refactoring
	public Move(content: ICellContent, direction: Direction) {
		let nextCell = content.Cell.GetNeightbor(direction);
		let previousCell = content.Cell;

		// get edge
		if (previousCell.x === this.width - 1 && !nextCell) {
			nextCell = this.GetCell(0, previousCell.y);
		} else if (previousCell.x === 0 && !nextCell) {
			nextCell = this.GetCell(this.width - 1, previousCell.y);
		}

		// check if there is a cell
		if (this.helper.IsUndefined(nextCell)) {
			return;
		}

		// is there a wall
		if (this.helper.IsWall(nextCell)) {
			return
		}

		if (this.helper.IsSameContent(nextCell, previousCell)) {
			return;
		}

		// is three unvisited dot
		if ((this.helper.IsYellowDot(nextCell) && this.helper.IsPlayer(previousCell)) && !this.helper.IsVisited(nextCell)) {
			nextCell.Facility.Visited = true;
		}


		if (this.helper.IsDifferentContent(nextCell, previousCell)) {
			nextCell.Content.Eaten();
			console.log("there is a collision");
		}

		if (this.helper.IsThisFacility(nextCell, FacilityType.PackGum) && this.helper.IsPlayer(previousCell)) {
			let player = previousCell.Content as Player;
			console.log("eat enemy");
			player.EatItem();
		}
		// 	return console.warn('collision between', content, newCell.Content);
		// }

		// else if (previousCell.Content.Type === ContentType.Player && !newCell.Visited) {
		// 	newCell.Visited = true;
		// }

		nextCell.Content = previousCell.Content;

		if (previousCell !== undefined) {
			previousCell.Content = undefined;
		}
	}

	private GetEnemy(cell: ICell): Enemy {
		let enemy: Enemy;
		switch (this.data[cell.y][cell.x]) {
			case 2:
				enemy = new Enemy(EnemyType.Blue);
				break;
			case 4:
				enemy = new Enemy(EnemyType.Red);
				break;
			case 5:
				enemy = new Enemy(EnemyType.Green);
				break;
			case 6:
				enemy = new Enemy(EnemyType.Yellow);
				break;
			default:
				console.error('unexpected enemy type');
		}
		return enemy;
	}
}
