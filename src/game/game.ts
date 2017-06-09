import { GridData } from './const';
import { Grid } from './logic/grid';
import { GridUi } from './ui/gridUI';
import { ICellContent, Direction, ContentType } from './interfaces/interfaces';
import { EnemyManager } from './logic/enemyManager/enemyManager';
import { Player } from './logic/grid/contents/player';


export class Game {
	private player: Player;
	private enemysArray: ICellContent[] = [];
	private gridUi;
	private grid;
	private game;
	private pathFind;
	private upKey;
	private downKey;
	private leftKey;
	private rigthKey;
	private enemyManager;
	private currentKey: Phaser.Key;

	constructor(game: Phaser.Game) {
		this.game = game;
		this.grid = new Grid(GridData);
		this.gridUi = new GridUi(game, this.grid);

		this.grid.AddContentCreatedListener((content: ICellContent) => {
			if (content.Type === ContentType.Player) {
				this.player = content as Player;
			} else if (content.Type === ContentType.Enemy) {
				this.enemysArray.push(content);
			}
		});

		this.grid.CreateBoard();
		this.KeyboardInputs();
		// todo think about this.
		this.enemyManager = new EnemyManager(this.grid, this.player, this.enemysArray);

	}

	public KeyboardInputs(): void {
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.upKey.onDown.add(() => this.player.Update(this.player, Direction.Up), this);

		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.downKey.onDown.add(() => this.player.Update(this.player, Direction.Down), this);

		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.leftKey.onDown.add(() => this.player.Update(this.player, Direction.Left), this);

		this.rigthKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.rigthKey.onDown.add(() => this.player.Update(this.player, Direction.Right), this);
	}

	public Update(): void {

		this.player.Update(this.player, this.player.currentDirection);
		this.enemyManager.Update();
	}

	public isGameOver(): boolean {
		return !this.player.Alive;
	}
}
