import { ICellFacility } from '../../interfaces/interfaces';
import * as Assets from '../../../assets';
import { START_GRID_POS } from '../../const';


export class YellowDotUi {
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private yellowDot: ICellFacility;

	constructor(game: Phaser.Game, yellowDot: ICellFacility) {
		this.game = game;
		this.yellowDot = yellowDot;
		this.Show();
		this.yellowDot.AddVisitListener(() => this.Hide());
	}

	private Show(): void {
		this.sprite = this.game.add.sprite(START_GRID_POS.x + this.yellowDot.Cell.x * 18 + 9, START_GRID_POS.y + this.yellowDot.Cell.y * 18 + 9, Assets.Images.ImagesYellowDot.getName());
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(0.050, 0.050);
		this.sprite.z = 1;
	}

	private Hide(): void {
		this.sprite.visible = false;
	}
}
