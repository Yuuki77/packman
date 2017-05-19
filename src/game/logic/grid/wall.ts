import { ICellContent, ICell, ContentType } from "../../../interfaces/interfaces";
import { Content } from "../content";

export class Wall extends Content {
	public readonly Type: ContentType = ContentType.Wall;
}