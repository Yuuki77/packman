import { Facility } from '../facility';
import { FacilityType } from "../../../interfaces/interfaces";

export class PackGum extends Facility {
	public readonly Type: FacilityType = FacilityType.PackGum;
	public Id: string = "Gum";
}
