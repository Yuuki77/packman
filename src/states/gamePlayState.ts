import { Game } from '../game/game';
import { PopUp } from '../game/ui/popUp';

export default class GamePlayState extends Phaser.State {
	public currentGame: Game;
	public popUp: PopUp;

	constructor() {
		super();
	}

	public create(): void {

		this.currentGame = new Game(this.game);
		this.popUp = new PopUp(this.game, this.currentGame.grid.scoreManager);
	}

	public update(): void {

		// to do write the logic
		if (this.currentGame.isGameOver()) {
			console.log('game is over');
			this.popUp.Show();
			// his.game.destroy();
		}
		this.currentGame.Update();
	}
}
