export interface IGrid {
	AddFacilityCreateListener(cb: (content: ICellFacility) => void);
	AddContentCreatedListener(cb: (facility: ICellContent) => void);
	GetCell(x: number, y: number): ICell | undefined;
	Move(content: ICellContent, nextCell: ICell);
	scoreManager: IScoreManager;
	width: number;
	height: number;
	visitedDotNumbers: number;
}

export interface ICell {
	readonly grid: IGrid;
	readonly x: number;
	readonly y: number;
	Content: ICellContent | undefined;
	Facility: ICellFacility | undefined;
	GetNeightbor(direction: Direction): ICell | undefined;
	GetNeightbors(): ICell[];
}

export interface ICellContent {
	x: number;
	y: number;
	Id: string;
	Eaten: boolean;
	readonly Type: ContentType;
	readonly EnemyType: EnemyType;
	Cell: ICell;
	AddMoveListener(cb: (cell: ICell) => void);
	previousCell: ICell;
	Alive: boolean;
}

export enum ContentType {
	Player,
	Enemy
}
export enum FacilityType {
	Wall,
	YellowDot,
	PackGum,
	Cherry
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
	Right,
	LeftUp,
	LeftDown,
	RightDows,
	RightUp
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
	EnemyEaten(enemy: ICellContent): void;
	SpecialItemEaten(cherry: ICellFacility);
	RestEnemyEatenTimes(): void;
	AddEnemyEatenListenr(cb: (newScore: number, enemy: ICellContent) => void);
	AddSpecialItemEatenListenr(cb: (newScore: number, cherry: ICellFacility) => void);
	Score: number;
}

export interface ICellFacility {
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

export const ENEMY_NOMAL_SPPED: number = 170;
export const PLAYERY_NOMAL_SPPED: number = 210;
export const ENEMY_RUN_AWAY_SPPED: number = 459;
export const ENEMY_GOHOME_SPPED: number = 120;