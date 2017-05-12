import { IGrid, ICellContent, ContentType } from "../interfaces/interfaces";
import { WallUi } from "./wallUi";
import { Wall } from "../logic/contents/wall";
import { Player } from "../logic/contents/player";
import { Enemy } from "../logic/contents/enemy";
import { PlayerUi } from "./playerUi";
import { EnemyUi } from "./enemyUi";
import { DotUi } from "./dotUi";
import { Dot } from "../logic/contents/dot";

export class GridUi {
	private game: Phaser.Game;
	private grid: IGrid;

	constructor(game: Phaser.Game, grid: IGrid) {
		this.game = game;
		this.grid = grid;
		this.RegisterEvents();
	}

	private ContentCreated(content: ICellContent): void {
		switch (content.Type) {
			case ContentType.Wall:
				new WallUi(this.game, content as Wall);
				break;
			case ContentType.Player:
				new PlayerUi(this.game, content as Player);
				break;
			case ContentType.Enemy:
				new EnemyUi(this.game, content as Enemy);
				break;
			case ContentType.Dot:
				new DotUi(this.game, content as Dot);
				break;
			default:
				console.warn('unexpected content', content);
		}
	}

	private RegisterEvents(): void {
		this.grid.AddContentCreatedListener((content: ICellContent) => this.ContentCreated(content));
	}
}
