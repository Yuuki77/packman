import { Game } from "../game/game";
import { TestPathfinding } from "../test/testPathfinding";

export default class GamePlayState extends Phaser.State {
	private currentGame;

	constructor() {
		super();
	}

	public create(): void {

		this.currentGame = new Game(this.game);
	   new TestPathfinding(this.game);
	}

	public update(): void {
		this.currentGame.findPlayer();
	}
}
