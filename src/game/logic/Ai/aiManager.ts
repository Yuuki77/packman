import { IAiManager, EnemyType } from '../../interfaces/interfaces';

export class AiManager implements IAiManager {
	private greedy: number;
	private emotively: number;
	private speed; number;
	private reactivity: number;

	constructor(enemyType: EnemyType) {
		switch (enemyType) {
			case EnemyType.Red:
				this.greedy = 0.9;
				this.emotively = 0.9;
				this.speed = 220;
				this.reactivity = 0.8;
				break;
			case EnemyType.Blue:
				this.greedy = 0.1;
				this.emotively = 0.7;
				this.speed = 250;
				this.reactivity = 0.5;

				break;
			case EnemyType.Yellow:
				this.greedy = 0.3;
				this.emotively = 0.3;
				this.speed = 270;
				this.reactivity = 6;

				break;
			case EnemyType.Green:
				this.greedy = 0.2;
				this.emotively = 0.2;
				this.speed = 300;
				this.reactivity = 7;

				break;
		}
	}

	public get Reactivity(): number {
		return this.reactivity;
	}

	public get Greedy(): number {
		return this.greedy;
	}

	public get Emotively(): number {
		return this.emotively;
	}

	public get Speed(): number {
		return this.speed;
	}
}
