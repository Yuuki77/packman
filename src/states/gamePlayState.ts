import { Game } from "../game/game";

export default class GamePlayState extends Phaser.State {
	private player;
	private currentGame;

	constructor() {
		super();
	}

	public create(): void {

		console.log(this.game);
		console.log(this.game.height);
		//console.log(new Player(this.game, 0, this.game.height));
		this.currentGame  = new Game(this.game);
		// this.game.add.existing(this.player);

	}
}