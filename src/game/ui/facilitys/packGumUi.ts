import { PackGum } from '../../logic/grid/facility/packGum';
import { ICellContent, ICellFacility } from '../../interfaces/interfaces';
import * as Assets from '../../../assets';
import { START_GRID_POS } from '../../const';

export class PackGumUi {
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private gum: ICellFacility;

	constructor(game: Phaser.Game, gum: ICellFacility) {
		this.game = game;
		this.gum = gum;
		this.Show();
		this.gum.AddVisitListener(() => this.Hide());

	}

	private Show(): void {
		this.sprite = this.game.add.sprite(START_GRID_POS.x + this.gum.Cell.x * 18 + 9, START_GRID_POS.y + this.gum.Cell.y * 18 + 9, Assets.Images.ImagesYellowDot.getName());
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(0.10, 0.10);
		this.sprite.z = 1;
	}

	private Hide(): void {
		this.sprite.visible = false;
	}
}
