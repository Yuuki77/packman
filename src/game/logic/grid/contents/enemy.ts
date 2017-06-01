import { ICellContent, ICell, EnemyType, ContentType } from '../../../interfaces/interfaces';
import { Content } from '../content';

export class Enemy extends Content {
	public readonly Type: ContentType = ContentType.Enemy;
	public readonly EnemyType: EnemyType;
	public Id = "Enemy";

	constructor(type: EnemyType) {
		super();
		this.EnemyType = type;
	}
}