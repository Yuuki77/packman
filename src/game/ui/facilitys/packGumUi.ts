import { PackGum } from "../../logic/grid/facility/packGum";
import { ICellContent, ICellFacility } from "../../interfaces/interfaces";
import * as Assets from "../../../assets";

export class PackGumUi {
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private gum: ICellFacility

	constructor(game: Phaser.Game, gum: ICellFacility) {
		this.game = game;
		this.gum = gum;
		this.Show();
		// this.gum.AddEatItemLister(() => this.Hide());
	}

	private Show(): void {
		this.sprite = this.game.add.sprite(this.gum.Cell.x * 18 + 9, this.gum.Cell.y * 18 + 9, Assets.Images.ImagesYellowDot.getName());
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(0.10, 0.10);
		this.sprite.z = 1;
	}

	private Hide(): void {
		this.sprite.visible = false;
	}
}
