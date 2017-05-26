import { Facility } from '../facility';
import { FacilityType } from "../../../interfaces/interfaces";


export class Wall extends Facility {
	public readonly Type: FacilityType = FacilityType.Wall;
}

