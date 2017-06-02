import { EnemyType, ICell } from '../../interfaces/interfaces';
import { Enemy } from '../../logic/grid/contents/enemy';
import * as Assets from '../../../assets';


export class EnemyUi {
	private enemy: Enemy;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private imageName: string;
	constructor(game: Phaser.Game, enemy: Enemy) {
		this.enemy = enemy;
		this.game = game;
		this.Show();
		this.enemy.AddMoveListener((newCell: ICell) => this.EnemyMoved(newCell));
		this.enemy.AddRunListener((isRun: boolean) => this.SpecialItemEaten(isRun));
	}

	private Show() {
		switch (this.enemy.EnemyType) {
			case EnemyType.Blue:
				this.imageName = Assets.Images.ImagesGhostBlue.getName();
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostBlue.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.020, 0.020);
				break;
			case EnemyType.Red:
				this.imageName = Assets.Images.ImagesGhostRed.getName();
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRed.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.09, 0.09);
				break;
			case EnemyType.Green:
				this.imageName = Assets.Images.ImagesGhostYellow.getName();
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRed.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.09, 0.09);
				break;
			case EnemyType.Yellow:
				this.imageName = Assets.Images.ImagesGhostYellow.getName();
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostYellow.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.035, 0.035);
				break;

		}
	}

	private EnemyMoved(newCell: ICell): void {
		let destination = { x: this.enemy.Cell.x * 18 + 9, y: this.enemy.Cell.y * 18 + 9 };

		if (destination.x !== this.sprite.x) {
			this.sprite.scale.x = destination.x < this.sprite.x ? -1 * Math.abs(this.sprite.scale.x) : 1 * Math.abs(this.sprite.scale.x);
		}

		this.game.add.tween(this.sprite).to(destination, 200, Phaser.Easing.Linear.None, true);
	}

	private SpecialItemEaten(isRun: boolean): void {
		console.log('specil Item eaten');
		if (isRun) {
			this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRunAway.getName());
			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.scale.setTo(0.020, 0.020);
		} else {
			this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, this.imageName);
			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.scale.setTo(0.020, 0.020);

		}
	}
}