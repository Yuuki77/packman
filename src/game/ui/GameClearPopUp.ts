import { IScoreManager, ICellContent, ICellFacility } from '../interfaces/interfaces';
import * as Assets from '../../assets';

export class GameClearPopUp {
	public isShow = false
	private game: Phaser.Game;
	private background: Phaser.Sprite;
	private scaleSpeed = 1
	private scaleSize = 0.1

	constructor(game: Phaser.Game) {
		this.game = game;
	}

	public Show() {
		this.isShow = true;
		this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.GraphicsGameClear.getName());
		this.background.alpha = 1;
		this.background.anchor.set(0.5, 0.5);
		this.background.scale.setTo(1.5, 1.5);
		this.background.inputEnabled = true;
		this.background.events.onInputDown.add(this.restartGame, this);
	}

	private restartGame() {
		console.log('restart game')
		this.isShow = false
		this.game.state.start('preloader');
	}
}
