import { ICell } from '../../interfaces/interfaces';
import { Player } from '../../logic/grid/contents/player';
import * as Assets from '../../../assets';
import { AnimationMyManager } from '../../logic/animationMyManager/animationMyManager';
import { PlayerMovingAnimationType } from '../../logic/enums/playerAnimationType';
import { START_GRID_POS } from '../../const';

export class PlayerUi {
	private player: Player;
	private game: Phaser.Game;
	private sprite: Phaser.Sprite = null;
	private animationController: AnimationMyManager;
	private currentMovingAnimation: PlayerMovingAnimationType;

	constructor(game: Phaser.Game, player: Player, animationController: AnimationMyManager) {
		this.player = player;
		this.game = game;
		this.animationController = animationController
		this.Show();

		this.RegisterEvents();
	}

	private StopCurrentAnimation(): void {
		this.sprite.animations.stop();
	}

	private Show(): void {
		this.sprite = this.game.add.sprite(START_GRID_POS.x + this.player.Cell.x * 18 + 9, START_GRID_POS.y + this.player.Cell.y * 18 + 9, Assets.Atlases.AtlasesCharactersAtlas.getName());
		this.sprite.animations.add('walkHorizontally', Phaser.Animation.generateFrameNames('pacmanGoLeft', 1, 2), 2, true);
		this.sprite.animations.add('walkVertically', Phaser.Animation.generateFrameNames('pacmanGoUp', 1, 2), 2, true);
		this.sprite.animations.play('walkHorizontally', 2, true);
		this.currentMovingAnimation = PlayerMovingAnimationType.WalkingHorizontally;
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(1);
		this.sprite.z = 5;
		this.sprite.scale.x = -1;
	}

	private PlayerMoved(newCell: ICell): void {
		let destination = { x: START_GRID_POS.x + this.player.Cell.x * 18 + 9, y: START_GRID_POS.y + this.player.Cell.y * 18 + 9 };
		let distance = Math.abs(destination.x - this.sprite.x) + Math.abs(destination.y - this.sprite.y);
		if (distance > 200) {
			this.sprite.position.x = destination.x;
			this.sprite.position.y = destination.y;
			return;
		}

		if (destination.x !== this.sprite.x) {
			if (this.currentMovingAnimation !== PlayerMovingAnimationType.WalkingHorizontally) {
				this.currentMovingAnimation = PlayerMovingAnimationType.WalkingHorizontally
				this.sprite.animations.stop();
				this.sprite.animations.play('walkHorizontally', 4, true);
			}

			this.sprite.scale.x = destination.x < this.sprite.x ? 1 * Math.abs(this.sprite.scale.x) : -1 * Math.abs(this.sprite.scale.x);
		} else if (destination.y !== this.sprite.y) {
			if (this.currentMovingAnimation !== PlayerMovingAnimationType.WalkingVertically) {
				this.currentMovingAnimation = PlayerMovingAnimationType.WalkingVertically
				this.sprite.animations.stop();
				this.sprite.animations.play('walkVertically', 4, true);
			}
			this.sprite.scale.y = destination.y < this.sprite.y ? 1 * Math.abs(this.sprite.scale.y) : -1 * Math.abs(this.sprite.scale.y);
		}

		const tween = this.game.add.tween(this.sprite).to(destination, 200, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(() => {
			this.animationController.CharacterMoved()
		}, this);
	}

	private onCompletePlayerEaten() {
		this.game.time.events.add(2000, () => {
			this.player.hasAnimationEnd = true;
			this.sprite.visible = false;
		});
	}

	private PlayerEaten() {
		this.sprite.destroy();
		this.sprite = this.game.add.sprite(START_GRID_POS.x + this.player.Cell.x * 18 + 9, START_GRID_POS.y + this.player.Cell.y * 18 + 9, Assets.Atlases.AtlasesDiePackmanSpriteSheet.getName());
		this.sprite.animations.add('eaten');
		this.sprite.animations.play('eaten', 4, false);
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(1);
		this.onCompletePlayerEaten();
	}

	private RegisterEvents(): void {
		this.player.AddMovedListener((newCell: ICell) => this.PlayerMoved(newCell));
		this.player.AddPlayerEatenListener(() => this.PlayerEaten());
		this.player.PlayerStopAnimation(() => this.StopCurrentAnimation());
	}
}