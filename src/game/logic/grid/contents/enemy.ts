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

	public AddRunListener(cb: (isRun: boolean) => void) {
		this.onRun.push(cb);
	}

	public toString(): string {
		return ' enemy ' + 'x' + this.x + 'y' + this.y;
	}
}
