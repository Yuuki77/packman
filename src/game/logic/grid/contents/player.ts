import { ICellContent, ICell, ContentType } from '../../../interfaces/interfaces';
import { Content } from '../content';

export class Player extends Content {
	public readonly Type: ContentType = ContentType.Player;
	public alive: boolean = true;

	private onEatItem: { () }[] = [];

	public EatItem() {
		if (this.Cell === undefined) {
			return;
		}
		for (let cb of this.onEatItem) {
			cb();
		}
	}
}