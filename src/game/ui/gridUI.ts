import { ContentType, FacilityType, ICellContent, ICellFacility, IGrid } from '../interfaces/interfaces';
import { Enemy } from '../logic/grid/contents/enemy';
import { Player } from '../logic/grid/contents/player';
import { Cherry } from '../logic/grid/facility/cherry';
import { PackGum } from '../logic/grid/facility/packGum';
import { Wall } from '../logic/grid/facility/wall';
import { YellowDot } from '../logic/grid/facility/yellowDot';
import { EnemyUi } from './contents/EnemyUi';
import { PlayerUi } from './contents/PlayerUi';
import { CherryUi } from './facilitys/cherryUi';
import { YellowDotUi } from './facilitys/dotUi';
import { PackGumUi } from './facilitys/PackGumUi';
import { WallUi } from './facilitys/wallUi';
import { ScoreUi } from './score/scoreUi';
import { AnimationMyManager } from '../logic/animationMyManager/animationMyManager';

export class GridUi {
	private game: Phaser.Game;
	private grid: IGrid;
	private player: Player;
	private animationController: AnimationMyManager

	constructor(game: Phaser.Game, grid: IGrid, player: Player, animationManager: AnimationMyManager) {
		this.game = game;
		this.grid = grid;
		this.player = player;
		this.animationController = animationManager
		this.RegisterEvents();
		// tslint:disable-next-line:no-unused-new
		new ScoreUi(this.game, this.grid.scoreManager);
	}

	// todo can I use interface instead of class name
	private ContentCreated(content: ICellContent): void {
		switch (content.type) {
			case ContentType.Player:
				new PlayerUi(this.game, content as Player, this.animationController);
				break;
			case ContentType.Enemy:
				new EnemyUi(this.game, content as Enemy, this.player, this.animationController);
				break;
			default:
				console.warn('unexpected content', content);
		}
	}

	private FacilityCreated(facility: ICellFacility): void {
		switch (facility.type) {
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
