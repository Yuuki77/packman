export interface IGrid {
	scoreManager: IScoreManager;
	width: number;
	height: number;
	visitedDotNumbers: number;
	AddFacilityCreateListener(cb: (content: ICellFacility) => void);
	AddContentCreatedListener(cb: (facility: ICellContent) => void);
	GetCell(x: number, y: number): ICell | undefined;
	Move(content: ICellContent, nextCell: ICell);
}

export interface ICell {
	readonly grid: IGrid;
	readonly x: number;
	readonly y: number;
	canPlayerVisit: boolean;
	Content: ICellContent | undefined;
	Facility: ICellFacility | undefined;
	GetNeightbor(direction: Direction): ICell | undefined;
	GetNeightbors(): ICell[];
}

export interface ICellContent {
	x: number;
	y: number;
	id: string;
	Eaten: boolean;
	readonly type: ContentType;
	readonly enemyType: EnemyType;
	previousCell: ICell;
	Cell: ICell;
	AddMoveListener(cb: (cell: ICell) => void);
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
	Right
}

export interface IPathFinding {
	readonly grid: IGrid;
	path: number[][];
}

export interface IEnemyController {
	yt: number[];
	xt: number[];
	Update(dt: number): void;
}

export interface IEnemyManager {
	grid: IGrid;
	enemyArray: ICellContent[];
	blueEnemyController: IEnemyController;
	Update(dt: number): void;
	// redEnemy: IEnemyManager;
}

export interface IScoreManager {
	Score: number;
	AddScoreListener(cb: (newScore: number) => void);
	EnemyEaten(enemy: ICellContent): void;
	SpecialItemEaten(cherry: ICellFacility);
	RestEnemyEatenTimes(): void;
	AddEnemyEatenListener(cb: (newScore: number, enemy: ICellContent) => void);
	AddSpecialItemEatenListener(cb: (newScore: number, cherry: ICellFacility) => void);
}
export interface IAiManager {
	Greedy: number;
	Emotively: number;
	Speed: number;
}

export interface ICellFacility {
	x: number;
	y: number;
	Cell: ICell;
	Visited: boolean;
	id: string;
	type: FacilityType;
	AddVisitListener(cb: () => void);
}

export interface IPlayer {
	GetNextCell(content: ICellContent, direction: Direction): ICell | undefined;
	CannotMove(content: ICellContent, nextCell: ICell): boolean;
}

export const ENEMY_NOMAL_SPPED = 500;
export const PLAYERY_NOMAL_SPPED = 210;
export const ENEMY_RUN_AWAY_SPPED = 459;
export const ENEMY_GOHOME_SPPED = 100;
