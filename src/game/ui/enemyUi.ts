import { Enemy } from "../logic/contents/enemy";
import * as Assets from '../../assets';
import { ICell } from "../interfaces/interfaces";

export class EnemyUi {
	private enemy: Enemy;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, enemy: Enemy) {
		this.enemy = enemy;
		this.game = game;
		this.Show();
		this.enemy.AddMoveListener((newCell: ICell) => this.EnemyMoved(newCell));
	}

	private Show() {
		this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhost1.getName());
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(0.020, 0.020);
		this.sprite.z = 6;
	}

	private EnemyMoved(newCell: ICell) {
		let destination = { x: this.enemy.Cell.x * 18 + 9, y: this.enemy.Cell.y * 18 + 9};

		if (destination.x !== this.sprite.x) {
			this.sprite.scale.x = destination.x < this.sprite.x ? -1 * Math.abs(this.sprite.scale.x) : 1 * Math.abs(this.sprite.scale.x);
		}

		this.game.add.tween(this.sprite).to(destination, 200, Phaser.Easing.Linear.None, true);
	}
}
