import { Game } from '../game/game';
import { GameOverPopUp } from '../game/ui/gameOverPopUp';
import { GameClearPopUp } from '../game/ui/GameClearPopUp';

export default class GamePlayState extends Phaser.State {
	private currentGame: Game;
	private gameOverPopUp: GameOverPopUp;
	private gameClearPopup: GameClearPopUp;

	constructor() {
		super();
	}

	public create(): void {

		this.currentGame = new Game(this.game);
		this.gameOverPopUp = new GameOverPopUp(this.game, this.currentGame.grid.scoreManager);
		this.gameClearPopup = new GameClearPopUp(this.game);
	}

	public update(): void {

		// to do write the logic
		if (this.currentGame.isGameOver()) {
			if (!this.gameOverPopUp.isShow) {
				this.gameOverPopUp.Show();
			}

			this.gameOverPopUp.Update()
		}

		if (this.currentGame.isGameClear()) {
			if (!this.gameClearPopup.isShow) {
				this.gameClearPopup.Show();
			}
		}
		this.currentGame.Update();
	}
}
