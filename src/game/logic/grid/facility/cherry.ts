import { FacilityType } from '../../../interfaces/interfaces';
import { Facility } from '../facility';

export class Cherry extends Facility {
	public readonly type: FacilityType = FacilityType.Cherry;
	public id: string = 'Cherry';
}
