import { ContentType, FacilityType, ICellContent, ICellFacility, IGrid, IScoreManager } from '../interfaces/interfaces';

export class ScoreManager implements IScoreManager {
	public readonly grid: IGrid;
	private score: number = 0;
	private enemyEatenTimes: number = 1;
	private onScoreUpdatedCallbacks: Array<{ (cb): void }> = [];
	private onScoreEnemyEatenCallbacks: Array<{ (newScore: number, enemy: ICellContent): void }> = [];
	private onScoreSpecialItemEatenCallbacks: Array<{ (newScore: number, specialItem: ICellFacility): void }> = [];

	public get Score() {
		return this.score;
	}

	public set Score(score: number) {
		this.score = score;
		if (this.score !== undefined) {
			for (let cb of this.onScoreUpdatedCallbacks) {
				cb(this.score);
			}
		}
	}

	public AddScoreListener(cb: (newScore: number) => void) {
		this.onScoreUpdatedCallbacks.push(cb);
	}

	public AddEnemyEatenListener(cb: (newScore: number, enemy: ICellContent) => void) {
		this.onScoreEnemyEatenCallbacks.push(cb);
	}

	public EnemyEaten(enemy: ICellContent) {
		if (enemy.Type !== ContentType.Enemy) {
			throw new Error('this content should be enemy');
		}
		let score = 200 * this.enemyEatenTimes++;
		if (this.score !== undefined) {
			for (let cb of this.onScoreEnemyEatenCallbacks) {
				cb(score, enemy);
			}
		}
	}

	public AddSpecialItemEatenListener(cb: (newScore: number, cherry: ICellFacility) => void) {
		this.onScoreSpecialItemEatenCallbacks.push(cb);
	}

	public SpecialItemEaten(cherry: ICellFacility) {
		if (cherry.Type !== FacilityType.Cherry) {
			throw new Error('this content should be cherry');
		}

		let score = 100;
		if (this.score !== undefined) {
			for (let cb of this.onScoreSpecialItemEatenCallbacks) {
				cb(score, cherry);
			}
		}
	}

	public RestEnemyEatenTimes(): void {
		this.enemyEatenTimes = 1;
	}
}
