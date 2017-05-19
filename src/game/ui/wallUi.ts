import { Wall } from "../logic/grid/contents/wall";
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
		this.sprite = this.game.add.sprite(this.wall.Cell.x * 18, this.wall.Cell.y * 18, Assets.Images.ImagesWall4.getName());
		this.sprite.scale.setTo(0.070, 0.070);
	}
}