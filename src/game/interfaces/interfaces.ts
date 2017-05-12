export interface IGrid {
	AddContentCreatedListener(cb: (content: ICellContent) => void);
	GetCell(x: number, y: number): ICell | undefined;
	Move(content: ICellContent, direction: Direction);
	width: number;
	height: number
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
	AddVistLietenr(cb: () => void);
	DotVisited() :void
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
	path: number[][];
}
export interface IEnemyController {
	grid: IGrid;
	player: ICellContent;
	enemy: ICellContent;
	FindPathToPlayer(): void;
}
