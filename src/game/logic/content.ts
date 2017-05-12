import { ICellContent, ICell, ContentType } from "../interfaces/interfaces";

export abstract class Content implements ICellContent {
	private onMove: { (cell: ICell): void }[] = [];
	private onVisitedDot: { (cell: ICell): void }[] = [];
	private cell: ICell;
	private previousCell: ICell ;
	public readonly abstract Type: ContentType;

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

	public DotVisited(cb : (cell : ICell) => void) {
		this.onVisitedDot.push(cb);
	}
}