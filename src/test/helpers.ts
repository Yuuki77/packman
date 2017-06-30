import { ContentType, FacilityType, ICell, ICellContent, IGrid } from '../game/interfaces/interfaces';
import { Enemy } from '../game/logic/grid/contents/enemy';

export class Helpers {
	constructor() {

	}
	public getContent(grid: IGrid, contentName: ContentType): ICellContent {

		for (let y = 0; y < grid.height; y++) {
			for (let x = 0; x < grid.width; x++) {
				// to do something wrong
				if (grid.GetCell(x, y).Content && grid.GetCell(x, y).Content.Type === contentName) {
					return grid.GetCell(x, y).Content;
				}
			}
		}
		console.warn('unexpected content', contentName);
		return undefined;
	}

	public findAllEnemys(grid: IGrid, contentName: ContentType): ICellContent[] {
		let enemys: ICellContent[] = [];
		for (let y = 0; y < grid.height; y++) {
			for (let x = 0; x < grid.width; x++) {

				if (grid.GetCell(x, y).Content && grid.GetCell(x, y).Content.Type === contentName) {
					let enemy = grid.GetCell(x, y);
					enemys.push(enemy.Content);
				}
			}
		}
		console.log('enemys', enemys);
		return enemys !== undefined ? enemys : undefined;
	}

	public assert(assertion) {
		if (!assertion) {
			throw new Error('this is undefined');
		}
	}

	public IsWall(cell: ICell): boolean {
		return (cell.Facility && cell.Facility.Type === FacilityType.Wall);
	}

	public IsYellowDot(cell: ICell): boolean {
		return (cell.Facility && cell.Facility.Type === FacilityType.YellowDot);
	}

	public IsPlayer(cell: ICell): boolean {
		let player = cell.Content;
		return player && player.Type === ContentType.Player;
	}

	public IsVisited(cell: ICell): boolean {
		if (this.IsYellowDot(cell)) {
			return cell.Facility.Visited;
		}
		return true;
	}

	public IsSameContent(cell: ICell, nextCell: ICell): boolean {
		if (cell.Content && nextCell.Content) {
			return cell.Content.Type === nextCell.Content.Type;
		}
		return false;
	}

	public IsDifferentContent(cell: ICell, nextCell: ICell): boolean {
		if (cell.Content && nextCell.Content) {
			return cell.Content.Type !== nextCell.Content.Type;
		}
		return false;
	}

	public IsThisFacility(cell: ICell, FacilityType: FacilityType): boolean {
		if (cell.Facility) {
			return cell.Facility.Type === FacilityType;
		}
		return false;
	}

}

// tslint:disable-next-line:max-classes-per-file
export class FakeGridUi {
	private grid: IGrid;

	constructor(grid: IGrid) {
		this.grid = grid;
		this.grid.AddContentCreatedListener((content: ICellContent) => {
			let enemy = content as Enemy;
			if (enemy.isPlayable !== undefined) {
				enemy.AddMoveListener((newCell: ICell) => enemy.isPlayable = true);
				enemy.AddRunListener((isRun: boolean) => enemy.isPlayable = true);
				enemy.AddEatenListner((isEaten: boolean) => enemy.isPlayable = true);
			}
		});
	}
}