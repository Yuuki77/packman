import { IScoreManager, ICell, ICellContent, IGrid, ContentType, ICellFacility, FacilityType } from '../interfaces/interfaces';

export class ScoreManager implements IScoreManager {
	public readonly grid: IGrid;
	private score: number = 0;
	private enemyEatenTimes: number = 1;
	private OnScoreUpdatedCallbacks: { (cb): void }[] = [];
	private OnScoreEnemyEatenCallbacks: { (newScore: number, enemy: ICellContent): void }[] = [];
	private OnScoreSpecialItemEatenCallbacks: { (newScore: number, specialItem: ICellFacility): void }[] = [];

	public get Score() {
		return this.score;
	}

	public set Score(score: number) {
		this.score = score;
		if (this.score !== undefined) {
			for (let cb of this.OnScoreUpdatedCallbacks) {
				cb(this.score);
			}
		}
	}

	public AddScoreListener(cb: (newScore: number) => void) {
		this.OnScoreUpdatedCallbacks.push(cb);
	}

	public AddEnemyEatenListener(cb: (newScore: number, enemy: ICellContent) => void) {
		this.OnScoreEnemyEatenCallbacks.push(cb);
	}

	public EnemyEaten(enemy: ICellContent) {
		if (enemy.Type !== ContentType.Enemy) {
			throw new Error('this content should be enemy');
		}
		let score = 200 * this.enemyEatenTimes++;
		if (this.score !== undefined) {
			for (let cb of this.OnScoreEnemyEatenCallbacks) {
				cb(score, enemy);
			}
		}
	}

	public AddSpecialItemEatenListener(cb: (newScore: number, cherry: ICellFacility) => void) {
		this.OnScoreSpecialItemEatenCallbacks.push(cb);
	}

	public SpecialItemEaten(cherry: ICellFacility) {
		if (cherry.Type !== FacilityType.Cherry) {
			throw new Error('this content should be cherry');
		}

		let score = 100;
		if (this.score !== undefined) {
			for (let cb of this.OnScoreSpecialItemEatenCallbacks) {
				cb(score, cherry);
			}
		}
	}

	public RestEnemyEatenTimes(): void {
		this.enemyEatenTimes = 1;
	}
}

