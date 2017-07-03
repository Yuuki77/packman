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
			console.log('game is over');
			// his.game.destroy();
		}
		this.currentGame.Update();
	}
}
