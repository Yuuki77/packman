import { Wall } from "../logic/grid";
import * as Assets from '../../assets';

export class WallUi {
	private wall: Wall;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, wall: Wall) {
		this.wall = wall;
		this.game = game;
		this.Show();
	}

	private Show() {
		this.sprite = this.game.add.sprite(this.wall.Cell.x * 32, this.wall.Cell.y * 32, Assets.Images.ImagesWall4.getName());
		this.sprite.scale.setTo(0.125, 0.125);
	}
}