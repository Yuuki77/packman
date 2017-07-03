import { FacilityType } from '../../../interfaces/interfaces';
import { Facility } from '../facility';

export class PackGum extends Facility {
	public readonly type: FacilityType = FacilityType.PackGum;
	public id: string = 'Gum';
}
