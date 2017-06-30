import { ICellContent, IGrid } from '../../../interfaces/interfaces';
import { EnemyController } from '../enemyController';

export class BlueEnemyController extends EnemyController {
	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent) {
		super(grid, player, enemy, 'Blue controller');
		this.xt = [1, -1, 0, 0];
		this.yt = [0, 0, 1, -1];
	}
}
