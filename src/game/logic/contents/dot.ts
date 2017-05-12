import { ICellContent, ICell, ContentType } from "../../interfaces/interfaces";
import { Content } from "../content";

export class Dot extends Content {
	public readonly Type: ContentType = ContentType.Dot;
}
