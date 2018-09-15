import { Player } from '../grid/contents/player'
import { TOTAL_CHARACTER_COUNT } from '../../const'

export class AnimationMyManager {
	private player: Player
	private moveFinishCount: number = 0

	constructor(player: Player) {
		this.player = player;
	}

	private AllCharsMoved() {
		return this.moveFinishCount === TOTAL_CHARACTER_COUNT
	}

	public CharacterMoved() {
		if (this.player.Alive) {
			return
		}

		this.moveFinishCount++

		if (this.AllCharsMoved()) {

			setTimeout(() => {
				this.player.EmitDeadEvents()
			}, 1000);
			this.moveFinishCount = 0
		}
	}

	public EnemyEaten() {
		if (this.player.Alive) {
			return
		}

		this.moveFinishCount++

		if (this.AllCharsMoved()) {

			setTimeout(() => {
				this.player.EmitDeadEvents()
			}, 1000);
			this.moveFinishCount = 0
		}
	}
}
