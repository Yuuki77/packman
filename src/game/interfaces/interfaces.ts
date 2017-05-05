export interface IGrid {
	AddContentCreatedListener(cb: (content: ICellContent) => void);
	GetCell(x: number, y: number): ICell | undefined;
	Move(content: ICellContent, direction: Direction);
}

export interface ICell {
	readonly grid: IGrid;
	readonly x: number;
	readonly y: number;
	Content: ICellContent | undefined;
	GetNeightbors(): ICell[];
	GetNeightbor(direction: Direction): ICell | undefined;
}

export interface ICellContent {
	readonly Type: ContentType;
	Cell: ICell;
	AddMoveListener(cb: (cell: ICell) => void);
}

export enum ContentType {
	Wall,
	Player,
	Enemy,
	Dot
}

export enum Direction {
	Up,
	Down,
	Left,
	Right
}

export interface IPathFinding {
	readonly grid: IGrid;
	path : number [][];
}
export interface IEnemyManager {

}
