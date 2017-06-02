import { ICellContent, ICell, EnemyType, ContentType } from '../../../interfaces/interfaces';
import { Content } from '../content';

export class Enemy extends Content {
	public readonly Type: ContentType = ContentType.Enemy;
	public readonly EnemyType: EnemyType;
	public Id = 'Enemy';
	public run: boolean = false;
	private onRun: { (run: boolean): void }[] = [];

	constructor(type: EnemyType) {
		super();
		this.EnemyType = type;
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

	public AddRunListener(cb: (isRun: boolean) => void) {
		this.onRun.push(cb);
	}
}

