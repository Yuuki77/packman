import { Facility } from '../facility';
import { FacilityType } from '../../../interfaces/interfaces';

export class Cherry extends Facility {
	public readonly Type: FacilityType = FacilityType.Cherry;
	public Id: string = 'Cherry';
}
