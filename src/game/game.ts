import { GridData } from './const';
import { Grid } from './logic/grid';
import { EnemyManager } from './logic/enemyManager';
import { BreadthFirstPathFind } from './logic/Pathfind';
import { GridUi } from './ui/gridUI';
import { ICellContent, ContentType, Direction } from "./interfaces/interfaces";

export class Game {
	private player;
	private enemy;
	private gridUi;
	private grid;
	private game;
	private pathFind;
	private upKey;
	private downKey;
	private leftKey;
	private rigthKey;
	private enenmyManager;

	constructor(game: Phaser.Game) {
		this.game = game;
		this.grid = new Grid();
		this.gridUi = new GridUi(game, this.grid);

		this.grid.AddContentCreatedListener((content: ICellContent) => {
			if (content.Type === ContentType.Player) {
				this.player = content;
			} else if(content.Type === ContentType.Enemy) {
				this.enemy = content;
			}
		});

		this.grid.CreateBoard();
		this.KeyboardInputs();
		this.enenmyManager = new EnemyManager(this.grid,this.player, this.enemy);
	}

	public KeyboardInputs(): void {
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.upKey.onDown.add(() => this.grid.Move(this.player, Direction.Up), this);

		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.downKey.onDown.add(() => this.grid.Move(this.player, Direction.Down), this);

		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.leftKey.onDown.add(() => this.grid.Move(this.player, Direction.Left), this);

		this.rigthKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.rigthKey.onDown.add(() => this.grid.Move(this.player, Direction.Right), this);
	}

	public findPlayer(): void {
		this.enenmyManager.findPathToPlayer();
	}
}
