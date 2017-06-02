import { ICellFacility } from '../../interfaces/interfaces';
import * as Assets from '../../../assets';


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
		this.sprite = this.game.add.sprite(this.yellowDot.Cell.x * 18 + 9, this.yellowDot.Cell.y * 18 + 9, Assets.Images.ImagesYellowDot.getName());
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(0.050, 0.050);
		this.sprite.z = 1;
	}

	private Hide(): void {
		this.sprite.visible = false;
	}
}
