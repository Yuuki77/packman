import { ICellContent, ICell, IGrid } from '../../../interfaces/interfaces';
import { EnemyController } from '../enemyController';

export class RedEnemyController extends EnemyController {
	constructor(grid: IGrid, player: ICellContent, enemy: ICellContent) {
		super(grid, player, enemy, "Red controller");
	}
}