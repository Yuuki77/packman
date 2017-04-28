import { Player } from "../logic/grid";
import * as Assets from '../../assets';
import { ICell } from "../interfaces/interfaces";

export class PlayerUi {
	private player: Player;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, player: Player) {
		this.player = player;
		this.game = game;
		this.Show();

		this.player.AddMoveListener((newCell: ICell) => this.PlayerMoved(newCell));
	}

	private Show() {
		this.sprite = this.game.add.sprite(this.player.Cell.x * 32, this.player.Cell.y * 32, Assets.Images.ImagesPacman.getName());
		this.sprite.scale.setTo(0.016, 0.016);
	}

	private PlayerMoved(newCell: ICell) {
		this.sprite.position.x = this.player.Cell.x * 32;
		this.sprite.position.y = this.player.Cell.y * 32;
	}
}