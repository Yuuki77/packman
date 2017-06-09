import { IScoreManager, ICell, ICellContent, IGrid } from '../interfaces/interfaces';

export class ScoreManager implements IScoreManager {
	public readonly grid: IGrid;
	private score: number = 0;
	private enemyEatenTimes: number = 1;

	// to do change
	private OnScoreUpdatedCallbacks: { (cb): void }[] = [];

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

	public AddEnemyEatenListenr(cb: (newScore: number) => void) {
		this.OnScoreUpdatedCallbacks.push(cb);
	}

	public EnemyEaten() {
		this.score = 200 * this.enemyEatenTimes++;
		if (this.score !== undefined) {
			for (let cb of this.OnScoreUpdatedCallbacks) {
				cb(this.score);
			}
		}
	}

	public ResetEnemyEatenTimes(): void {
		this.enemyEatenTimes = 1;
	}
}

