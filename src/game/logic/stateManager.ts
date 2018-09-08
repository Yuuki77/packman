import { IStateManager, StateType, ICellContent, ICell, IPlayer } from '../../game/interfaces/interfaces';

export class StateMyManager implements IStateManager {

	private currentState: StateType;
	constructor(state: StateType) {
		this.currentState = state;
	}

	public UpdateState(updateState: StateType): void {
		this.currentState = updateState;
	}
	public get CurrentState(): StateType {
		return this.currentState;
	}
}

