import { ContentType, Direction, EnemyType } from '../../../interfaces/interfaces';
import { AiManager } from '../../Ai/aiManager';
import { Content } from '../content';

export class Enemy extends Content {
	public readonly type: ContentType = ContentType.Enemy;
	public readonly enemyType: EnemyType;
	public homeDirections: Direction[] = [];
	public aiManager: AiManager;
	public id = 'Enemy';
	private run: boolean = false;
	private onRun: Array<{ (run: boolean): void }> = [];
	public isPlayable: boolean = true;
	public goHome: boolean = false;

	constructor(type: EnemyType) {
		super();
		this.enemyType = type;
		this.aiManager = new AiManager(type);
		this.SetHomeDirection(type);
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

	private SetHomeDirection(enemyType: EnemyType): void {
		switch (enemyType) {
			case EnemyType.Red:
				this.homeDirections.push(Direction.Up);
				this.homeDirections.push(Direction.Left);
				break;
			case EnemyType.Blue:
				this.homeDirections.push(Direction.Down);
				this.homeDirections.push(Direction.Left);
				break;
			case EnemyType.Green:
				this.homeDirections.push(Direction.Right);
				this.homeDirections.push(Direction.Down);
				break;
			case EnemyType.Yellow:
				this.homeDirections.push(Direction.Up);
				this.homeDirections.push(Direction.Right);
				break;
			default:
				throw new Error('unexpected enemy type' + enemyType);
		}
	}

	public AddRunListener(cb: (isRun: boolean) => void) {
		this.onRun.push(cb);
	}

	public toString(): string {
		return ' enemy ' + 'x' + this.x + 'y' + this.y;
	}
}
