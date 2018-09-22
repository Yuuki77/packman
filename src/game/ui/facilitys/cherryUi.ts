import { ICellFacility } from '../../interfaces/interfaces';
import * as Assets from '../../../assets';
import { Cherry } from '../../logic/grid/facility/cherry';
import { START_GRID_POS } from '../../const';


export class CherryUi {
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private cherry: Cherry;

	constructor(game: Phaser.Game, cherry: ICellFacility) {
		this.game = game;
		this.cherry = cherry as Cherry;
		this.cherry.AddVisitListener(() => this.Hide());
		setTimeout(() => this.Show(), 2000);
	}

	private Show(): void {
		// TODO think about this . I am pretty sure that is wrong
		if (this.cherry.showed) {
			return;
		}
		this.sprite = this.game.add.sprite(START_GRID_POS.x + this.cherry.Cell.x * 18 + 9, START_GRID_POS.y + this.cherry.Cell.y * 18 + 9, Assets.Images.ImagesCherry.getName());
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.z = 1;
		this.cherry.showed = true;
	}

	private Hide(): void {
		this.sprite.destroy();
	}
}
