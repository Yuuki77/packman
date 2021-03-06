import { IScoreManager, ICellContent, ICellFacility } from '../../interfaces/interfaces';
import { START_GRID_POS } from '../../const';

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
		this.scoreManager.AddEnemyEatenListener((newScore: number, enemy: ICellContent) => this.ScoreSpecialUpdated(newScore, enemy));
		this.scoreManager.AddSpecialItemEatenListener((newScore: number, cherry: ICellFacility) => this.ScoreSpecialItmEatenUpdated(newScore, cherry));
	}

	private Show() {
		this.scoreText = this.game.add.text(this.game.world.centerX / 2, 16, 'score: 0', { fontSize: 15, fill: '#F0F8FF' });
		this.scoreText.text = 'score: 0';
	}

	private ScoreUpdated(newScore: number) {
		this.score += newScore;
		this.scoreText.text = 'score: ' + this.score;
	}

	private ScoreSpecialUpdated(newScore: number, enemy: ICellContent) {
		console.error('ScoreSpecialUpdated is called');
		this.scoreEnemyEatenText = this.game.add.text(START_GRID_POS.x + enemy.x * 18 + 9, START_GRID_POS.y + enemy.y * 18 + 9, newScore.toString(), { fontSize: 15, fill: '#F0F8FF' });
		this.score += newScore;
		// this.scoreEnemyEatenText.text = newScore.toString();
		this.game.time.events.add(1000, this.RemoveText, this);
	}

	private ScoreSpecialItmEatenUpdated(newScore: number, cherry: ICellFacility) {
		console.error('ScoreSpecialItmEatenUpdated is called');
		this.scoreEnemyEatenText = this.game.add.text(START_GRID_POS.x + cherry.Cell.x * 18 + 9, START_GRID_POS.y + cherry.Cell.y * 18, newScore.toString(), { fontSize: 15, fill: '#F0F8FF' });
		this.score += newScore;
		this.scoreEnemyEatenText.text = newScore.toString();
		this.game.time.events.add(1000, this.RemoveText, this);
	}

	private RemoveText(): void {
		console.log('remove text is called')
		this.scoreEnemyEatenText.destroy();
	}
}
