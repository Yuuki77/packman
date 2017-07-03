import { FacilityType } from '../../../interfaces/interfaces';
import { Facility } from '../facility';

export class YellowDot extends Facility {
	public readonly type: FacilityType = FacilityType.YellowDot;
	public id: string = 'Dot';
}
