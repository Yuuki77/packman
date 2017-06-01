export interface IGrid {
	AddFacilityCreateListener(cb: (content: ICellFacility) => void);
	AddContentCreatedListener(cb: (facility: ICellContent) => void);
	GetCell(x: number, y: number): ICell | undefined;
	Move(content: ICellContent, nextCell: ICell);
	scoreManager: IScoreManager;
	width: number;
	height: number;
}

export interface ICell {
	readonly grid: IGrid;
	readonly x: number;
	readonly y: number;
	Content: ICellContent | undefined;
	Facility: ICellFacility | undefined;
	GetNeightbor(direction: Direction): ICell | undefined;
	GetNeightbors(): ICell[];
	// AddVistLietenr(cb: () => void);
}

export interface ICellContent {
	x: number;
	y: number;
	Id: string;
	readonly Type: ContentType;
	readonly EnemyType: EnemyType;
	Cell: ICell;
	AddMoveListener(cb: (cell: ICell) => void);
	AddEatEnemyListener(cb: (cell: ICell) => void);
	EatEnemy();
	Eaten();
	Alive: boolean;
}

export enum ContentType {
	Player,
	Enemy
}
export enum FacilityType {
	Wall,
	YellowDot,
	PackGum
}

export enum EnemyType {
	Red,
	Blue,
	Yellow,
	Green
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
	Update(): void;
}

export interface IEnemyManager {
	grid: IGrid;
	enemyArray: ICellContent[];
	Update(): void;
	// redEnemy: IEnemyManager;
	blueEnemyController: IEnemyController;
}

export interface IScoreManager {
	AddScoreListener(cb: (newScore: number) => void);
	Score: number;
}

export interface ICellFacility {
	grid: IGrid;
	x: number;
	y: number;
	Cell: ICell;
	Visited: boolean;
	Id: string;
	Type: FacilityType;
	AddVisitListener(cb: () => void);
}

export interface IPlayer {
	GetNextCell(content: ICellContent, direction: Direction): ICell | undefined;
	CannotMove(content: ICellContent, nextCell: ICell): boolean;
}