import { IScoreManager, ICellContent, ICellFacility } from '../interfaces/interfaces';
import * as Assets from '../../assets';

export class PopUp {
	public isShow = false
	private game: Phaser.Game;
	private background: Phaser.Sprite;
	private restartTxt: Phaser.Text;

	private scoreManager: IScoreManager;
	private scaleSpeed = 1
	private scaleSize = 0.1

	constructor(game: Phaser.Game, scoreManager: IScoreManager) {
		this.game = game;
		this.scoreManager = scoreManager;
	}

	public Show() {
		this.isShow = true
		this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.GraphicsGameOver.getName());
		this.background.alpha = 1;
		this.background.anchor.set(0.5);
		this.background.scale.setTo(0.5, 0.5);

		this.background.inputEnabled = true;
		const x = ((this.background.width) / 2);
		const y = this.background.y + this.background.y / 4 + 20;
		this.restartTxt = this.game.add.text(x, y, 'Restart Game ?', { fontSize: 30, fill: '#F0F8FF' });
		this.background.events.onInputDown.add(this.restartGame, this);
	}

	public Update() {
		const scale = (Math.sin(this.game.time.totalElapsedSeconds() * this.scaleSpeed) * this.scaleSize) + 1;
		this.restartTxt.scale.setTo(scale);
	}

	private restartGame() {
		this.isShow = false
		this.game.state.start('preloader');
	}
}
