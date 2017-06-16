import { IGrid, ICellContent, ContentType, ICellFacility, FacilityType } from '../interfaces/interfaces';
import { Wall } from '../logic/grid/facility/wall';
import { Player } from '../logic/grid/contents/player';
import { Enemy } from '../logic/grid/contents/enemy';
import { ScoreUi } from './score/scoreUi';
import { YellowDot } from '../logic/grid/facility/yellowDot';
import { PackGum } from '../logic/grid/facility/packGum';
import { EnemyUi } from './contents/EnemyUi';
import { PlayerUi } from './contents/PlayerUi';
import { YellowDotUi } from './facilitys/dotUi';
import { PackGumUi } from './facilitys/PackGumUi';
import { WallUi } from './facilitys/wallUi';
import { CherryUi } from './facilitys/cherryUi';
import { Cherry } from '../logic/grid/facility/cherry';

export class GridUi {
	private game: Phaser.Game;
	private grid: IGrid;
	private player: ICellContent;

	constructor(game: Phaser.Game, grid: IGrid) {
		this.game = game;
		this.grid = grid;
		this.RegisterEvents();
		new ScoreUi(this.game, this.grid.scoreManager);
	}

	// todo can I use interface instead of class name
	private ContentCreated(content: ICellContent): void {
		switch (content.Type) {
			case ContentType.Player:
				this.player = content;
				new PlayerUi(this.game, content as Player);
				break;
			case ContentType.Enemy:
				new EnemyUi(this.game, content as Enemy);
				break;
			default:
				console.warn('unexpected content', content);
		}
	}

	private FacilityCreated(facility: ICellFacility): void {
		switch (facility.Type) {
			case FacilityType.Wall:
				new WallUi(this.game, facility as Wall);
				break;
			case FacilityType.YellowDot:
				new YellowDotUi(this.game, facility as YellowDot);
				break;
			case FacilityType.PackGum:
				new PackGumUi(this.game, facility as PackGum);
				break;
			case FacilityType.Cherry:
				new CherryUi(this.game, facility as Cherry);
				break;
			default:
				console.warn('unexpected facility', facility);
		}
	}

	private RegisterEvents(): void {
		this.grid.AddContentCreatedListener((content: ICellContent) => this.ContentCreated(content));
		this.grid.AddFacilityCreateListener((facility: ICellFacility) => this.FacilityCreated(facility));
	}
}
