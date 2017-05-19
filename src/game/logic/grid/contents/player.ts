import { ICellContent, ICell, ContentType } from "../../../interfaces/interfaces";
import { Content } from "../content";

export class Player extends Content {
	public readonly Type: ContentType = ContentType.Player;
	private onEatItem: { (cell: ICell): void }[] = [];

	public EatItem(cell: ICell) {
		this.Cell = cell;
		if (this.Cell === undefined) {
			return;
		}
		for (let cb of this.onEatItem) {
			cb(this.Cell);
		}
	}
}