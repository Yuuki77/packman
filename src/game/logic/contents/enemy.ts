import { ICellContent, ICell, ContentType } from "../../interfaces/interfaces";
import { Content } from "../content";

export class Enemy extends Content {
	public readonly Type: ContentType = ContentType.Enemy;

}
