import * as Assets from '../../../assets';
import { EnemyType, ICell } from '../../interfaces/interfaces';
import { Enemy } from '../../logic/grid/contents/enemy';

export class EnemyUi {
	private enemy: Enemy;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;

	constructor(game: Phaser.Game, enemy: Enemy) {
		this.enemy = enemy;
		this.game = game;
		this.Show();
		this.enemy.AddMoveListener((newCell: ICell) => this.EnemyMoved(newCell));
		this.enemy.AddRunListener((isRun: boolean) => this.SpecialItemEaten(isRun));
		this.enemy.AddEatenListner((isEaten: boolean) => this.EnemyEaten(isEaten));
	}

	private Show() {
		switch (this.enemy.enemyType) {
			case EnemyType.Blue:
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostBlue.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.020, 0.020);
				break;
			case EnemyType.Red:
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRed.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.09, 0.09);
				break;
			case EnemyType.Green:
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRed.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.09, 0.09);
				break;
			case EnemyType.Yellow:
				this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostYellow.getName());
				this.sprite.anchor.setTo(0.5, 0.5);
				this.sprite.scale.setTo(0.035, 0.035);
				break;
			default: console.log('unexpected enemyType' + this.enemy.enemyType);
		}
	}

	private EnemyMoved(newCell: ICell): void {
		let destination = { x: this.enemy.Cell.x * 18 + 9, y: this.enemy.Cell.y * 18 + 9 };

		if (destination.x !== this.sprite.x) {
			this.sprite.scale.x = destination.x < this.sprite.x ? -1 * Math.abs(this.sprite.scale.x) : 1 * Math.abs(this.sprite.scale.x);
		}

		// TODO : use const for speeds.
		// let duration = this.enemy.goHome ? 50 : 250;
		let duration = this.GetDuration();
		let tween = this.game.add.tween(this.sprite).to(destination, duration, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(this.onComplete, this);
	}

	private GetDuration(): number {
		if (this.enemy.goHome) {
			return 50;
		}
		return this.enemy.aiManager.Speed;
	}

	private onComplete() {
		this.enemy.isPlayable = true;
	}

	private SpecialItemEaten(isRun: boolean): void {
		if (isRun) {
			this.sprite.destroy();
			this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRunAway.getName());
			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.scale.setTo(1, 1);
		} else {
			this.sprite.destroy();
			this.Show();
		}
		this.onComplete();
	}

	private EnemyEaten(eaten: boolean): void {
		if (eaten) {
			this.sprite.destroy();
			this.sprite = this.game.add.sprite(this.enemy.Cell.x * 18 + 9, this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostDead.getName());
			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.scale.setTo(0.12, 0.12);
		} else {
			this.sprite.destroy();
			this.Show();
		}
		this.onComplete();
	}
}
