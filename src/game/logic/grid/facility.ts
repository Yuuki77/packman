import { IGrid, ICellContent, ICell, Direction, ICellFacility, FacilityType } from '../../interfaces/interfaces';

export abstract class Facility implements ICellFacility {
	public readonly grid: IGrid;
	public readonly x: number;
	public readonly y: number;
	private cell: ICell;
	public abstract Type: FacilityType | undefined;
	private visited: boolean = false;
	private onVisitedDot: { (): void }[] = [];
	public abstract Id: string;
	// todo think about this


	// constructor(grid: IGrid, x: number, y: number) {
	// 		 this.grid = grid;
	// 		 this.x = x;
	// 		 this.y = y;
	// }

	public get Cell() {
		return this.cell;
	}

	public set Cell(cell: ICell | undefined) {
		this.cell = cell;
		// if (cell !== undefined) {
		// 	for (let cb of this.onMove) {
		// 		cb(this.Cell);
	 		// }
		// }
	}

	public get Visited(): boolean {
		return this.visited;
	}

	public set Visited(visited: boolean) {
		this.visited = visited;
		this.cell.grid.scoreManager.Score = 10;
		for (let cb of this.onVisitedDot) {
			cb();
		}
	}

	public AddVisitListener(cb: () => void) {
		this.onVisitedDot.push(cb);
	}
}