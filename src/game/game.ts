import { gridData } from './const';
import { ContentType, Direction, ICellContent } from './interfaces/interfaces';
import { EnemyManager } from './logic/enemyManager/enemyManager';
import { Grid } from './logic/grid';
import { Enemy } from './logic/grid/contents/enemy';
import { Player } from './logic/grid/contents/player';
import { GridUi } from './ui/gridUI';

export class Game {
	private player: Player;
	private enemysArray: Enemy[] = [];
	private gridUi;
	private grid: Grid;
	private game;
	private upKey;
	private downKey;
	private leftKey;
	private rightKey;
	private enemyManager;
	private currentTime: number;

	constructor(game: Phaser.Game) {
		this.game = game;
		this.grid = new Grid(gridData);
		this.gridUi = new GridUi(game, this.grid);

		this.grid.AddContentCreatedListener((content: ICellContent) => {
			if (content.type === ContentType.Player) {
				this.player = content as Player;
			} else if (content.type === ContentType.Enemy) {
				let enemy = content as Enemy;
				this.enemysArray.push(enemy);
			}
		});

		this.grid.CreateBoard();
		this.enemyManager = new EnemyManager(this.grid, this.player, this.enemysArray);
		this.currentTime = Date.now();
	}

	public KeyboardInputs(): void {
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.upKey.onDown.add(() => {
			if (!this.game.paused) {
				this.player.Update(this.player, Direction.Up);
			}
		}, this);

		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.downKey.onDown.add(() => {
			if (!this.game.paused) {
				this.player.Update(this.player, Direction.Down);
			}
		}, this);

		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.leftKey.onDown.add(() => {
			if (!this.game.paused) {
				this.player.Update(this.player, Direction.Left);
			}
		}, this);

		this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.rightKey.onDown.add(() => {
			if (!this.game.paused) {
				this.player.Update(this.player, Direction.Right);
			}
		}, this);
	}

	public Update(): void {
		let dt = this.game.time.elapsedMS;
		this.KeyboardInputs();
		this.player.Update(this.player, this.player.currentDirection);
		this.enemyManager.Update(dt);

		// debug
		(window as any).games = this.game;
	}

	public isGameOver(): boolean {
		return !this.player.Alive;
	}
}
