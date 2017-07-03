import { FacilityType, ICell, ICellFacility } from '../../interfaces/interfaces';

export abstract class Facility implements ICellFacility {
	public readonly x: number;
	public readonly y: number;
	private cell: ICell;
	public showed: boolean = false;
	public abstract type: FacilityType | undefined;
	private visited: boolean = false;
	private onVisitedDot: Array<{ (): void }> = [];
	public abstract id: string;

	public get Cell() {
		return this.cell;
	}

	public set Cell(cell: ICell | undefined) {
		this.cell = cell;
	}

	public get Visited(): boolean {
		return this.visited;
	}

	public set Visited(visited: boolean) {
		this.visited = visited;

		if (visited === true) {
			this.cell.grid.visitedDotNumbers++;
		}
		this.cell.grid.scoreManager.Score = 10;
		for (let cb of this.onVisitedDot) {
			cb();
		}
	}

	public AddVisitListener(cb: () => void) {
		this.onVisitedDot.push(cb);
	}
}
