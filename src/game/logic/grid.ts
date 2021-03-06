import { Helpers } from '../../test/helpers';
import { ContentType, EnemyType, FacilityType, ICell, ICellContent, ICellFacility, IGrid, IStateManager } from '../interfaces/interfaces';
import { ScoreManager } from '../score/scoreManager';
import { Cell } from './grid/cell';
import { Enemy } from './grid/contents/enemy';
import { Player } from './grid/contents/player';
import { Cherry } from './grid/facility/cherry';
import { PackGum } from './grid/facility/packGum';
import { Wall } from './grid/facility/wall';
import { YellowDot } from './grid/facility/yellowDot';

export class Grid implements IGrid {
	private grid: Cell[][];
	private onFacilityCreatedCallbacks: Array<{ (facility: ICellFacility): void; }> = [];
	private onContentCreatedCallbacks: Array<{ (content: ICellContent): void; }> = [];
	private data: number[][];
	private stateManager: IStateManager;

	public visitedDotNumbers: number = 0;
	public numberOfDots: number = 0;
	public player: Player;
	public width: number = 0;
	public height: number = 0;
	public scoreManager: ScoreManager;
	public dotCount: number = 0;
	private helper: Helpers;
	private now: number;

	constructor(gridData: number[][], stateManager: IStateManager) {
		this.data = gridData;
		this.scoreManager = new ScoreManager();
		this.helper = new Helpers();
		this.now = Date.now();
		this.stateManager = stateManager;
		this.player = new Player(this.stateManager);
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
					this.dotCount++;
					this.CreateFacility(FacilityType.YellowDot, this.grid[y][x]);
					this.numberOfDots++;
					continue;
				}

				if (this.data[y][x] === 7) {
					this.numberOfDots++;
					this.CreateFacility(FacilityType.PackGum, this.grid[y][x]);
					continue;
				}

				if (this.data[y][x] === 9) {
					this.CreateFacility(FacilityType.Cherry, this.grid[y][x]);
				}

				if (this.data[y][x] === 8) {
					this.grid[y][x].CanPlayerVisit = false;
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
			case FacilityType.Cherry:
				facility = new Cherry();
				break;
			default:
				console.error('un known type', type);
		}
		cell.Facility = facility;
		for (let cb of this.onFacilityCreatedCallbacks) {
			cb(facility);
		}
		return facility;
	}

	private CreateContent(type: ContentType, cell: ICell): void {
		let content;
		switch (type) {
			case ContentType.Player:
				content = this.player;
				break;
			// todo change the logic
			case ContentType.Enemy:
				content = this.GetEnemy(cell);
				break;
			default:
				console.error('un known type', type);
		}

		cell.Content = content;
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

	public Move(movingContent: ICellContent, nextCell: ICell) {
		// console.log('moving cell content', movingContent.id);
		if (nextCell.Content) {
			// console.log('next cell content', nextCell.Content.id);
		}
		if (nextCell === undefined) {
			throw Error('next cell is undefined');
		}

		if (nextCell === movingContent.Cell) {
			console.warn('next cell is same place');
		}

		// clean previous position
		if (movingContent.Cell !== undefined) {
			movingContent.Cell.Content = undefined;
		}


		// set new position
		nextCell.Content = movingContent;
		movingContent.Cell = nextCell;
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
				enemy = new Enemy(EnemyType.Pink);
				break;
			case 6:
				enemy = new Enemy(EnemyType.Yellow);
				break;
			default:
				console.error('unexpected enemy type');
		}
		return enemy;
	}
	public toString() {
		return this.DataToString();
	}

	private DataToString() {
		let result = '';

		for (let i = 0; i < this.width; i++) {
			result += '-------';
		}
		result += '\n';
		for (let y = 0; y < this.height; y++) {
			result += '|';

			for (let x = 0; x < this.width; x++) {
				let cell = this.GetCell(x, y);
				if (cell.Content) {
					result += cell.Content.id;
				} else if (cell.Facility && cell.Facility.type !== FacilityType.YellowDot) {
					result += ' ' + cell.Facility.id + ' ';
				} else {
					result += ' ' + ' 0 ' + ' ';
				}
				result += '|';
			}
			result += '\n';

			for (let i = 0; i < this.width; i++) {
				result += '-------';
			}
			result += '\n';
		}
		return result;
	}

	public IsGameClear(): boolean {
		return this.visitedDotNumbers === this.numberOfDots;
	}
}
