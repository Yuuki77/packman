export interface IGrid {
	AddFacilityCreateListener(cb: (content: ICellFacility) => void);
	AddContentCreatedListener(cb: (facility: ICellContent) => void);
	GetCell(x: number, y: number): ICell | undefined;
	Move(content: ICellContent, direction: Direction);
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
	GetNeightbors(): ICell[];
	GetNeightbor(direction: Direction): ICell | undefined;
	// AddVistLietenr(cb: () => void);
}

export interface ICellContent {
	readonly Type: ContentType;
	readonly EnemyType: EnemyType;
	Cell: ICell;
	AddMoveListener(cb: (cell: ICell) => void);
	AddEatEnemyListener(cb: (cell: ICell) => void);
	EatEnemy();
	Eaten();
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
	GetDirection(grid: IGrid, content: ICellContent, position: ICell): void;
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
	Type : FacilityType;
	AddVisitListener(cb: () => void);
}