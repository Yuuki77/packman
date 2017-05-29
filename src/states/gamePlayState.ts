import { Game } from '../game/game';

export default class GamePlayState extends Phaser.State {
	private currentGame;

	constructor() {
		super();
	}

	public create(): void {

		this.currentGame = new Game(this.game);
	}

	public update(): void {

		if (this.currentGame.isGameOver()) {
			this.game.destroy();
		}
		this.currentGame.Update();
	}
}
