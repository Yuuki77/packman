import { ICellContent, ICell, ContentType, EnemyType } from "../../../interfaces/interfaces";
import { Content } from "../content";

export class Enemy extends Content {
	public readonly Type: ContentType = ContentType.Enemy;
	public readonly EnemyType: EnemyType;
	constructor(type: EnemyType) {
		super();
		this.EnemyType = type;
	}
}
