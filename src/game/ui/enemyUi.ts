import { Enemy } from "../logic/grid";
import * as Assets from '../../assets';
import { ICell } from "../interfaces/interfaces";

export class EnemyUi {
	private enemy: Enemy;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, enemy: Enemy) {
		this.enemy = enemy;
		this.game = game;
		console.log("enemy is created");
		this.Show();
		this.enemy.AddMoveListener((newCell: ICell) => this.EnemyMoved(newCell));
	}

	private Show() {
		console.log('display enemy');
		this.sprite = this.game.add.sprite(this.enemy.Cell.x * 32, this.enemy.Cell.y * 32, Assets.Images.ImagesGhost1.getName());
		this.sprite.scale.setTo(0.050, 0.050);
	}

	private EnemyMoved(newCell: ICell) {
		this.sprite.position.x = this.enemy.Cell.x * 32;
		this.sprite.position.y = this.enemy.Cell.y * 32;
	}
}
