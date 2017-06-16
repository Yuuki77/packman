import { IScoreManager, ICellContent, ICellFacility } from '../../interfaces/interfaces';

export class ScoreUi {
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private scoreManager: IScoreManager;
	private scoreText: Phaser.Text;
	private scoreEnemyEatenText: Phaser.Text;
	private score: number = 0;

	constructor(game: Phaser.Game, scoreManager: IScoreManager) {
		this.game = game;
		this.Show();
		this.scoreManager = scoreManager;
		this.scoreManager.AddScoreListener((newScore: number) => this.ScoreUpdated(newScore));
		this.scoreManager.AddEnemyEatenListenr((newScore: number, enemy: ICellContent) => this.ScoreSpecialUpdated(newScore, enemy));
		this.scoreManager.AddSpecialItemEatenListenr((newScore: number, cherry: ICellFacility) => this.ScoreSpecialItmEatenUpdated(newScore, cherry));
	}

	private Show() {
		this.scoreText = this.game.add.text(600, 16, 'score: 0', { fontSize: '18px', fill: '#F0F8FF' });
		this.scoreText.text = 'score: 0';
	}

	private ScoreUpdated(newScore: number) {
		this.score += newScore;
		this.scoreText.text = 'score: ' + this.score;
	}

	private ScoreSpecialUpdated(newScore: number, enemy: ICellContent) {
		this.scoreEnemyEatenText = this.game.add.text(enemy.x * 18 + 9, enemy.y * 18 + 9, newScore.toString(), { fontSize: '15px', fill: '#F0F8FF' });
		this.score += newScore;
		this.scoreEnemyEatenText.text = 'score: ' + this.score;
		this.game.time.events.add(1000, this.RemoveText, this);
	}

	private ScoreSpecialItmEatenUpdated(newScore: number, cherry: ICellFacility) {
		this.scoreEnemyEatenText = this.game.add.text(cherry.Cell.x * 18 + 9, cherry.Cell.y * 18, newScore.toString(), { fontSize: '15px', fill: '#F0F8FF' });
		this.score += newScore;
		this.scoreEnemyEatenText.text = 'score: ' + this.score;
		this.game.time.events.add(1000, this.RemoveText, this);
	}

	private RemoveText(): void {
		this.scoreEnemyEatenText.destroy();
	}
}
