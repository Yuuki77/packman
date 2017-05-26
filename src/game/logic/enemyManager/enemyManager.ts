import { IGrid, IEnemyController, ICellContent, ICell, Direction, IEnemyManager, EnemyType } from '../../interfaces/interfaces';
import { PathFinding } from '../pathFind/pathFind';
import { RedEnemyController } from './controllers/redController';
import { BlueEnemyController } from './controllers/blueController';
import { GreenEnemyController } from './controllers/greenController';
import { YellowEnemyController } from './controllers/yellowController';

export class EnemyManager implements IEnemyManager {
	public blueEnemyController: BlueEnemyController;
	public greenEnemyController: BlueEnemyController;
	public redEnemyController: BlueEnemyController;
	public yellowEnemyController: BlueEnemyController;

	public readonly grid: IGrid;
	public player: ICellContent;
	public enemyArray: ICellContent[] = [];
	public enemyControllers: IEnemyController[] = [];

	constructor(grid: IGrid, player: ICellContent, enemyArray: ICellContent[]) {
		this.grid = grid;
		this.player = player;
		this.enemyArray = enemyArray;

		for (let enemy of this.enemyArray) {
			switch (enemy.EnemyType) {
				case EnemyType.Blue:
					this.blueEnemyController = new BlueEnemyController(this.grid, this.player, enemy);
					this.enemyControllers.push(this.blueEnemyController);
					break;
				case EnemyType.Red:
					this.redEnemyController = new RedEnemyController(this.grid, this.player, enemy);
					this.enemyControllers.push(this.redEnemyController);
					break;
				case EnemyType.Yellow:
					this.yellowEnemyController = new YellowEnemyController(this.grid, this.player, enemy);
					this.enemyControllers.push(this.yellowEnemyController);
					break;
				case EnemyType.Green:
					this.greenEnemyController = new GreenEnemyController(this.grid, this.player, enemy);
					this.enemyControllers.push(this.greenEnemyController);
					break;

				default:
					console.error('unexpected enemy', enemy);
			}
		}
	}
	Update(): void {
		for (let enemyController of this.enemyControllers) {
			enemyController.Update();
		}
	}
}