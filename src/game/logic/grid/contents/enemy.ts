import { ICellContent, ICell, EnemyType, ContentType, Direction } from '../../../interfaces/interfaces';
import { Content } from '../content';
import { AiManager } from '../../Ai/aiManager';

export class Enemy extends Content {
	public readonly Type: ContentType = ContentType.Enemy;
	public readonly EnemyType: EnemyType;
	public homePosition1: Direction;
	public homePosition2: Direction;
	public aiManager: AiManager;
	public Id = 'Enemy';
	private run: boolean = false;
	private onRun: { (run: boolean): void }[] = [];
	public readonly HomeDirection;
	public isPlayable: boolean = true;
	public goHome: boolean = false;

	constructor(type: EnemyType) {
		super();
		this.EnemyType = type;
		this.aiManager = new AiManager(type);
		this.GetHomeDirection(type);
	}

	public get Run() {
		return this.run;
	}

	public set Run(value: boolean) {
		this.run = value;
		for (let cb of this.onRun) {
			cb(this.run);
		}
	}

	// public set Alive(value: boolean | undefined) {
	// 	this.run = value;
	// 	for (let cb of this.onRun) {
	// 		cb(this.run);
	// 	}
	// }
	private GetHomeDirection(enemyType: EnemyType) {
		let homePosition: number[];

		switch (enemyType) {
			case EnemyType.Red:
				this.homePosition1 = Direction.Up;
				this.homePosition2 = Direction.Left;
				break;
			case EnemyType.Blue:
				this.homePosition1 = Direction.Down;
				this.homePosition2 = Direction.Left;
				break;
			case EnemyType.Green:
				this.homePosition1 = Direction.Right;
				this.homePosition2 = Direction.Down;
				break;
			case EnemyType.Yellow:
				this.homePosition1 = Direction.Up;
				this.homePosition2 = Direction.Right;
				break;
			default:
				throw new Error('unexpected enemy type' + enemyType);
		}
		return homePosition;
	}

	public AddRunListener(cb: (isRun: boolean) => void) {
		this.onRun.push(cb);
	}

	public toString(): string {
		return ' enemy ' + 'x' + this.x + 'y' + this.y;
	}
}
