import { FacilityType } from '../../../interfaces/interfaces';
import { Facility } from '../facility';

export class Wall extends Facility {
	public readonly type: FacilityType = FacilityType.Wall;
	public id: string = 'Wall';

}
