import { EnemyType, IEnemyController, IEnemyManager, IGrid, IStateManager, StateType } from '../../interfaces/interfaces';
import { Enemy } from '../grid/contents/enemy';
import { Player } from '../grid/contents/player';
import { BlueEnemyController } from './controllers/blueController';
import { GreenEnemyController } from './controllers/greenController';
import { RedEnemyController } from './controllers/redController';
import { YellowEnemyController } from './controllers/yellowController';

export class EnemyManager implements IEnemyManager {
	public blueEnemyController: BlueEnemyController;
	public greenEnemyController: BlueEnemyController;
	public redEnemyController: BlueEnemyController;
	public yellowEnemyController: BlueEnemyController;

	public readonly grid: IGrid;
	public player: Player;
	public enemyArray: Enemy[] = [];
	public enemyControllers: IEnemyController[] = [];
	public stateManager: IStateManager;

	constructor(grid: IGrid, player: Player, enemyArray: Enemy[], stateManager: IStateManager) {
		this.grid = grid;
		this.player = player;
		this.enemyArray = enemyArray;
		this.stateManager = stateManager;

		for (let enemy of this.enemyArray) {
			switch (enemy.enemyType) {
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

	Update(dt: number): void {
		if (this.stateManager.CurrentState === StateType.Stop) {
			return;
		}

		for (let enemyController of this.enemyControllers) {
			enemyController.Update(dt);
		}
	}
}
