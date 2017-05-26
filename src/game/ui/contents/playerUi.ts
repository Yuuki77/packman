import { ICell } from "../../interfaces/interfaces";
import { Player } from "../../logic/grid/contents/player";
import * as Assets from "../../../assets";

export class PlayerUi {
	private player: Player;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, player: Player) {
		this.player = player;
		this.game = game;
		this.Show();

		this.RegisterInterface();
	}

	private Show(): void {

		// this.sprite = this.game.add.sprite(this.player.Cell.x * 18 + 9, this.player.Cell.y * 18 + 9, Assets.Images.ImagesPacman.getName());
		this.sprite = this.game.add.sprite(this.player.Cell.x * 18 + 9, this.player.Cell.y * 18 + 9, Assets.Atlases.AtlasesPackman.getName());

		this.sprite.animations.add('walk');
		this.sprite.animations.play('walk', 4, true);
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(1);
		this.sprite.z = 5;
	}

	private PlayerMoved(newCell: ICell): void {
		let destination = { x: this.player.Cell.x * 18 + 9, y: this.player.Cell.y * 18 + 9 };
		let distance = Math.abs(destination.x - this.sprite.x) + Math.abs(destination.y - this.sprite.y);
		if (distance > 200) {
			this.sprite.position.x = destination.x;
			this.sprite.position.y = destination.y;
			return;
		}

		if (destination.x !== this.sprite.x) {
			this.sprite.scale.x = destination.x < this.sprite.x ? -1 * Math.abs(this.sprite.scale.x) : 1 * Math.abs(this.sprite.scale.x);
		}

		this.game.add.tween(this.sprite).to(destination, 200, Phaser.Easing.Linear.None, true);
	}

	private PlayerEaten() {
		// this.player.alive = false;
		this.sprite.visible = false;
		console.error('game is over');
	}

	private RegisterInterface(): void {
		this.player.AddMoveListener((newCell: ICell) => this.PlayerMoved(newCell));
		this.player.AddEatenLister(() => this.PlayerEaten());
	}
}