import { IGrid, ICellContent, ContentType } from "../interfaces/interfaces";
import { WallUi } from "./wallUi";
import { Wall, Player } from "../logic/grid";
import { PlayerUi } from "./playerUi";

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
		} else {
			console.warn('no ui for', content);
		}
	}

	private RegisterEvents(): void {
		this.grid.AddContentCreatedListener((content: ICellContent) => this.ContentCreated(content));
	}
}
