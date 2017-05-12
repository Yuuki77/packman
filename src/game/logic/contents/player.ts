import { ICellContent, ICell, ContentType } from "../../interfaces/interfaces";
import { Content } from "../content";

export class Player extends Content {
	public readonly Type: ContentType = ContentType.Player;
}