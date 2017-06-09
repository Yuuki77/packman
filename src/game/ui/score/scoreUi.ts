import { IScoreManager } from '../../interfaces/interfaces';

export class ScoreUi {
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private scoreManager: IScoreManager;
	private scoreText: Phaser.Text;
	private score: number = 0;

	constructor(game: Phaser.Game, scoreManager: IScoreManager) {

		this.game = game;
		this.Show();
		this.scoreManager = scoreManager;
		this.scoreManager.AddScoreListener((newScore: number) => this.ScoreUpdated(newScore));
		this.scoreManager.AddEnemyEatenListenr((newScore: number) => this.ScoreUpdated(newScore));
	}

	private Show() {
		this.scoreText = this.game.add.text(600, 16, 'score: 0', { fontSize: '18px', fill: '#F0F8FF' });
		this.scoreText.text = 'score: 0';
	}

	private ScoreUpdated(newScore: number) {
		this.score += newScore;
		this.scoreText.text = 'score: ' + this.score;
	}
}
