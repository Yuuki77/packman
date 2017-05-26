import { Game } from '../game/game';
import { Test } from '../test/test';

export default class GamePlayState extends Phaser.State {
	private currentGame;

	constructor() {
		super();
	}

	public create(): void {

		this.currentGame = new Game(this.game);
		new Test(this.game);
	}

	public update(): void {

		if (this.currentGame.isGameOver()) {
			this.game.destroy();
		}
		this.currentGame.Update();
	}
}
