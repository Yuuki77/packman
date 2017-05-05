import { Game } from "../game/game";
import {TestPathfinding} from "../test/testPathfinding";

export default class GamePlayState extends Phaser.State {
	private currentGame;

	constructor() {
		super();
	}

	public create(): void {

		//console.log(new Player(this.game, 0, this.game.height));
		this.currentGame  = new Game(this.game);
		let test = new TestPathfinding(this.game);
		// this.game.add.existing(this.player);
		// this.currentGame.findPlayer();
	}
	public update() : void {
		this.currentGame.findPlayer();
	}
}
