import * as Assets from '../../../assets';
import { EnemyType, ICell, ICellContent } from '../../interfaces/interfaces';
import { Enemy } from '../../logic/grid/contents/enemy';
import { Player } from '../../logic/grid/contents/player';
import { AnimationMyManager } from '../../logic/animationMyManager/animationMyManager';
import { PlayerMovingAnimationType } from '../../logic/enums/playerAnimationType';
import { START_GRID_POS } from '../../const';

export class EnemyUi {
	private enemy: Enemy;
	private game: Phaser.Game;
	private currentDisplayedSprite: Phaser.Sprite = null;
	private player: Player;
	private animationMyManager: AnimationMyManager
	private currentMovingAnimation: PlayerMovingAnimationType
	private imageKey: string;
	horizontalSprite: Phaser.Sprite;
	upSprite: Phaser.Sprite;
	downSprite: Phaser.Sprite;

	constructor(game: Phaser.Game, enemy: Enemy, player: ICellContent, animationMyManager: AnimationMyManager) {
		this.enemy = enemy;
		this.game = game;
		this.player = player as Player;
		this.animationMyManager = animationMyManager;
		this.Show();
		this.player.AddPlayerEatenListener(() => this.PlayerEaten());
		this.enemy.AddMovedListener((newCell: ICell) => this.EnemyMoved(newCell));
		this.enemy.AddRunListener((isRun: boolean) => this.SpecialItemEaten(isRun));
		this.enemy.AddEatenListener((isEaten: boolean) => this.EnemyEaten(isEaten));
	}

	private Show() {
		let defaultSprite;
		switch (this.enemy.enemyType) {
			case EnemyType.Blue:
				this.imageKey = 'BlueEnemy'
				defaultSprite = 'Up'
				break;
			case EnemyType.Red:
				this.imageKey = 'RedEnemy'
				defaultSprite = 'Down'
				break;
			case EnemyType.Pink:
				this.imageKey = 'PinkEnemy'
				defaultSprite = 'Down'
				break;
			case EnemyType.Yellow:
				this.imageKey = 'YellowEnemy'
				defaultSprite = 'Up'
				break;
			default: console.log('unexpected enemyType' + this.enemy.enemyType);
		}

		this.horizontalSprite = this.game.add.sprite(START_GRID_POS.x + this.enemy.Cell.x * 18 + 9, START_GRID_POS.y + this.enemy.Cell.y * 18 + 9, Assets.Atlases.AtlasesCharactersAtlas.getName(), this.imageKey + 'Right');
		this.horizontalSprite.anchor.setTo(0.5, 0.5);
		this.horizontalSprite.scale.setTo(1, 1);
		this.horizontalSprite.visible = false;
		this.horizontalSprite.z = 1;

		this.upSprite = this.game.add.sprite(START_GRID_POS.x + this.enemy.Cell.x * 18 + 9, START_GRID_POS.y + this.enemy.Cell.y * 18 + 9, Assets.Atlases.AtlasesCharactersAtlas.getName(), this.imageKey + 'Up');
		this.upSprite.anchor.setTo(0.5, 0.5);
		this.upSprite.scale.setTo(1, 1);
		this.upSprite.z = 1;

		this.downSprite = this.game.add.sprite(START_GRID_POS.x + this.enemy.Cell.x * 18 + 9, START_GRID_POS.y + this.enemy.Cell.y * 18 + 9, Assets.Atlases.AtlasesCharactersAtlas.getName(), this.imageKey + 'Down');
		this.downSprite.anchor.setTo(0.5, 0.5);
		this.downSprite.scale.setTo(1, 1);
		this.downSprite.z = 1;


		this.currentDisplayedSprite = this.upSprite;
		this.ActiveSprite(defaultSprite)
	}

	private EnemyMoved(newCell: ICell): void {
		let destination = { x: START_GRID_POS.x + this.enemy.Cell.x * 18 + 9, y: START_GRID_POS.y + this.enemy.Cell.y * 18 + 9 };

		if (!this.enemy.Run) {
			if (destination.x !== this.currentDisplayedSprite.x) {
				if (this.currentMovingAnimation !== PlayerMovingAnimationType.WalkingHorizontally) {
					this.ActiveSprite('Horizontal');
					this.currentMovingAnimation = PlayerMovingAnimationType.WalkingHorizontally
				}
				this.currentDisplayedSprite.scale.x = destination.x < this.currentDisplayedSprite.x ? -1 * Math.abs(this.currentDisplayedSprite.scale.x) : 1 * Math.abs(this.currentDisplayedSprite.scale.x);
			} else if (destination.y !== this.currentDisplayedSprite.y) {
				const directionKey = destination.y < this.currentDisplayedSprite.y ? 'Up' : 'Down';
				this.ActiveSprite(directionKey);
				this.currentMovingAnimation = PlayerMovingAnimationType.WalkingVertically;
			}
		}

		// TODO : use const for speeds.
		// let duration = this.enemy.goHome ? 50 : 250;
		let duration = this.GetDuration();
		let tween = this.game.add.tween(this.currentDisplayedSprite).to(destination, duration, Phaser.Easing.Linear.None, true);
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
		this.animationMyManager.CharacterMoved()
	}

	private SpecialItemEaten(isRun: boolean): void {
		if (isRun) {
			this.currentDisplayedSprite.destroy();
			this.currentDisplayedSprite = this.game.add.sprite(START_GRID_POS.x + this.enemy.Cell.x * 18 + 9, START_GRID_POS.y + this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostRunAway.getName());
			this.currentDisplayedSprite.anchor.setTo(0.5, 0.5);
			this.currentDisplayedSprite.scale.setTo(1, 1);
		} else {
			this.currentDisplayedSprite.destroy();
			this.Show();
		}
		this.onComplete();
	}

	private EnemyEaten(eaten: boolean): void {
		if (eaten) {
			this.currentDisplayedSprite.destroy();
			this.currentDisplayedSprite = this.game.add.sprite(START_GRID_POS.x + this.enemy.Cell.x * 18 + 9, START_GRID_POS.y + this.enemy.Cell.y * 18 + 9, Assets.Images.ImagesGhostDead.getName());
			this.currentDisplayedSprite.anchor.setTo(0.5, 0.5);
			this.currentDisplayedSprite.scale.setTo(0.12, 0.12);
		} else {
			this.currentDisplayedSprite.destroy();
			this.Show();
		}
		this.onComplete();
	}

	private PlayerEaten(): void {
		this.currentDisplayedSprite.destroy();
	}

	private ActiveSprite(type: string) {
		switch (type) {
			case 'Up':
				this.upSprite.x = this.currentDisplayedSprite.position.x;
				this.upSprite.y = this.currentDisplayedSprite.position.y;
				this.currentDisplayedSprite = this.upSprite;
				this.upSprite.visible = true;
				this.downSprite.visible = false;
				this.horizontalSprite.visible = false;
				break;
			case 'Down':
				this.downSprite.x = this.currentDisplayedSprite.position.x;
				this.downSprite.y = this.currentDisplayedSprite.position.y;
				this.currentDisplayedSprite = this.downSprite;
				this.upSprite.visible = false;
				this.downSprite.visible = true;
				this.horizontalSprite.visible = false;
				break;
			case 'Horizontal':
				this.horizontalSprite.x = this.currentDisplayedSprite.position.x;
				this.horizontalSprite.y = this.currentDisplayedSprite.position.y;
				this.currentDisplayedSprite = this.horizontalSprite;
				this.upSprite.visible = false;
				this.downSprite.visible = false;
				this.horizontalSprite.visible = true;
				break;
			default:
				throw new Error('unexpected type' + type)
		}
	}
}
