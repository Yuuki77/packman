import { ICellContent, IGrid } from '../../../interfaces/interfaces';
import { EnemyController } from '../enemyController';

export class RedEnemyController extends EnemyController {

	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent) {
		super(grid, player, enemy, 'Red controller');
		// right down
		this.xt = [1, -1, 0, 0];
		this.yt = [0, 0, -1, 1];
	}
}
