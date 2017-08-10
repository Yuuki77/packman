import { IGrid, IStateManager } from '../../../interfaces/interfaces';
import { Enemy } from '../../grid/contents/enemy';
import { Player } from '../../grid/contents/player';
import { EnemyController } from '../enemyController';

export class BlueEnemyController extends EnemyController {
	constructor(grid: IGrid, player: Player, enemy: Enemy) {
		super(grid, player, enemy, 'Blue controller');
		this.xt = [1, -1, 0, 0];
		this.yt = [0, 0, 1, -1];
	}
}
