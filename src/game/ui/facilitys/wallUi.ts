import { Wall } from '../../logic/grid/facility/wall';
import * as Assets from '../../../assets';
import { START_GRID_POS } from '../../const';

export class WallUi {
	private wall: Wall;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, wall: Wall) {
		this.game = game;
		this.wall = wall;
		this.Show();
	}

	private Show() {
		this.sprite = this.game.add.sprite(START_GRID_POS.x + this.wall.Cell.x * 18, START_GRID_POS.y + this.wall.Cell.y * 18, Assets.Images.ImagesWall4.getName());
		this.sprite.scale.setTo(0.070, 0.070);
	}
}