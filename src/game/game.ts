import { gridData } from './const';
import { ContentType, Direction, ICellContent, StateType } from './interfaces/interfaces';
import { EnemyManager } from './logic/enemyManager/enemyManager';
import { Grid } from './logic/grid';
import { Enemy } from './logic/grid/contents/enemy';
import { Player } from './logic/grid/contents/player';
import { GridUi } from './ui/gridUI';
import { StateMyManager } from './logic/stateManager';
import { AnimationMyManager } from './logic/animationMyManager/animationMyManager';

export class Game {
	private player: Player;
	private enemysArray: Enemy[] = [];
	private gridUi;
	public grid: Grid;
	private game: Phaser.Game;
	private upKey;
	private downKey;
	private leftKey;
	private rightKey;
	private enemyManager: EnemyManager;
	private stateManager: StateMyManager;
	private animationMyManager: AnimationMyManager;
	private currentTime: number;

	constructor(game: Phaser.Game) {
		this.game = game;
		this.stateManager = new StateMyManager(StateType.Start);
		this.grid = new Grid(gridData, this.stateManager);

		this.animationMyManager = new AnimationMyManager(this.grid.player);
		this.gridUi = new GridUi(game, this.grid, this.grid.player, this.animationMyManager);

		this.grid.AddContentCreatedListener((content: ICellContent) => {
			if (content.type === ContentType.Player) {
				this.player = content as Player;
			} else if (content.type === ContentType.Enemy) {
				let enemy = content as Enemy;
				this.enemysArray.push(enemy);
			}
		});

		this.grid.CreateBoard();
		this.enemyManager = new EnemyManager(this.grid, this.player, this.enemysArray, this.stateManager);

		this.currentTime = Date.now();
	}

	public KeyboardInputs(): void {
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.upKey.onDown.add(() => {
			if (this.stateManager.CurrentState === StateType.Stop) {
				return;
			}
			this.player.Update(this.player, Direction.Up);
		}, this);

		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.downKey.onDown.add(() => {
			if (this.stateManager.CurrentState === StateType.Stop) {
				return;
			}
			this.player.Update(this.player, Direction.Down);
		}, this);

		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.leftKey.onDown.add(() => {
			if (this.stateManager.CurrentState === StateType.Stop) {
				return;
			}
			this.player.Update(this.player, Direction.Left);

		}, this);

		this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.rightKey.onDown.add(() => {
			if (this.stateManager.CurrentState === StateType.Stop) {
				return;
			}
			this.player.Update(this.player, Direction.Right);

		}, this);
	}

	public Update(): void {
		let dt = this.game.time.elapsedMS;
		this.enemyManager.Update(dt);
		this.KeyboardInputs();
		this.player.Update(this.player, this.player.currentDirection);

		// debug
		(window as any).games = this.game;
	}

	// todo change the logic
	public isGameOver(): boolean {
		return this.player && !this.player.Alive && this.player.hasAnimationEnd;
	}
}
