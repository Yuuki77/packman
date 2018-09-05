import { IScoreManager, ICellContent, ICellFacility } from '../interfaces/interfaces';
import * as Assets from '../../assets';

export class PopUp {
	private game: Phaser.Game;
	private background: Phaser.Sprite;
	private restartButton: Phaser.Sprite;
	private scoreManager: IScoreManager;

	constructor(game: Phaser.Game, scoreManager: IScoreManager) {
		this.game = game;
		this.scoreManager = scoreManager;
	}

	public Show() {
		this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.GraphicsGameOver.getName());
		this.background.alpha = 0.2;
		this.background.anchor.set(0.5);
		this.background.scale.setTo(0.5, 0.5);

		this.background.inputEnabled = true;
		const x = ((this.background.width) / 2);
		const y = this.background.y + this.background.y / 4 + 20;

		this.restartButton = this.game.add.sprite(this.background.x, y, Assets.Images.ImagesRestartButton.getName());
		this.restartButton.inputEnabled = true;
		this.restartButton.input.priorityID = 1;
		this.restartButton.input.useHandCursor = true;
		this.restartButton.events.onInputDown.add(this.restartGame, this);

		this.restartButton.anchor.set(0.5);
		this.restartButton.scale.setTo(0.5, 0.5);
		// this.scoreEnemyEatenText = this.game.add.text(cherry.Cell.x * 18 + 9, cherry.Cell.y * 18, newScore.toString(), { fontSize: '15px', fill: '#F0F8FF' });
		// // this.game.time.events.add(1000, this.RemoveText, this);
		// this.scoreText = this.game.add.text(600, 16, 'score: 0', { fontSize: '18px', fill: '#F0F8FF' });
		// this.scoreText.text = 'score: 0';
	}

	private Remove(): void {
		// this.scoreEnemyEatenText.destroy();
	}

	private restartGame() {
		console.log('restart Game is called');
		this.game.state.start('preloader');
	}
}
