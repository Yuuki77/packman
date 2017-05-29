import { Grid } from '../game/logic/grid';
import { ICellContent, IGrid, ICell, Direction, ContentType, FacilityType } from '../game/interfaces/interfaces';
import { Player } from "../game/logic/grid/contents/player";

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
		console.warn('uncexpected content', contentName);
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
	public IsUndefined(cell: ICell): boolean {
		return cell == undefined;
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

	public IsThisContent(cell: ICell, ContentType): boolean {
		if (cell.Content) {
			return cell.Content.Type === ContentType.Type;
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


