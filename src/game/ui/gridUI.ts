import { IGrid, ICellContent, ContentType } from "../interfaces/interfaces";
import { WallUi } from "./wallUi";
import { Wall, Player, Enemy } from "../logic/grid";
import { PlayerUi } from "./playerUi";
import { EnemyUi } from "./enemyUi";

export class GridUi {
	private game: Phaser.Game;
	private grid: IGrid;

	constructor(game: Phaser.Game, grid: IGrid) {
		this.game = game;
		this.grid = grid;

		this.RegisterEvents();
	}

	private ContentCreated(content: ICellContent): void {
		if (content.Type === ContentType.Wall) {
			new WallUi(this.game, content as Wall);
		} else if (content.Type == ContentType.Player) {
			new PlayerUi(this.game, content as Player)
		} else if (content.Type === ContentType.Enemy) {
			new EnemyUi(this.game, content as Enemy);
		} else {
			console.warn('no ui for', content);
		}
	}

	private RegisterEvents(): void {
		this.grid.AddContentCreatedListener((content: ICellContent) => this.ContentCreated(content));
	}
}
