import { IScoreManager, ICell, ICellContent, IGrid, ContentType, ICellFacility, FacilityType } from '../interfaces/interfaces';

export class ScoreManager implements IScoreManager {
	public readonly grid: IGrid;
	private score: number = 0;
	private enemyEatenTimes: number = 1;

	// to do change
	private OnScoreUpdatedCallbacks: { (cb): void }[] = [];
	private OnScoreEnemyEatenCallbacks: { (newScore: number, enemy: ICellContent): void }[] = [];
	private OnScoreSoecialItemEatenCallbacks: { (newScore: number, specialItem: ICellFacility): void }[] = [];

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

	public AddEnemyEatenListenr(cb: (newScore: number, enemy: ICellContent) => void) {
		this.OnScoreEnemyEatenCallbacks.push(cb);
	}

	public EnemyEaten(enemy: ICellContent) {
		if (enemy.Type !== ContentType.Enemy) {
			throw new Error('this content should be enemy');
		}
		this.score = 200 * this.enemyEatenTimes++;
		if (this.score !== undefined) {
			for (let cb of this.OnScoreEnemyEatenCallbacks) {
				cb(this.score, enemy);
			}
		}
	}

	public AddSpecialItemEatenListenr(cb: (newScore: number, cherry: ICellFacility) => void) {
		this.OnScoreSoecialItemEatenCallbacks.push(cb);
	}

	public SpecialItemEaten(cherry: ICellFacility) {
		if (cherry.Type !== FacilityType.Cherry) {
			throw new Error('this content should be cherry');
		}
		this.score = 100;
		if (this.score !== undefined) {
			for (let cb of this.OnScoreSoecialItemEatenCallbacks) {
				cb(this.score, cherry);
			}
		}
	}

	public RestEnemyEatenTimes(): void {
		this.enemyEatenTimes = 1;
	}
}

