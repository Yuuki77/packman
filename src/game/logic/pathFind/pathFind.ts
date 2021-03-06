import { FacilityType, ICell, IGrid, IPathFinding } from '../../interfaces/interfaces';

export class PathFinding implements IPathFinding {
	readonly grid: IGrid;
	path: number[][];
	visited: boolean[][];
	private startPosition: ICell;
	private goalPosition: ICell;

	constructor(grid: IGrid) {
		this.grid = grid;
	}

	public GetPath(): ICell[] {
		let shortestPath = [];
		shortestPath.push(this.goalPosition);
		let count = 0;
		while (true) {
			let currentPosition: ICell = shortestPath[shortestPath.length - 1];
			if (currentPosition.x === this.startPosition.x && currentPosition.y === this.startPosition.y) {
				break;
			}
			let neighbors: ICell[] = currentPosition.GetNeighbors();
			for (let i = 0; i < neighbors.length; i++) {
				if (neighbors[i].Facility && neighbors[i].Facility.type === FacilityType.Wall) {
					continue;
				}
				if (this.visited[neighbors[i].y][neighbors[i].x] === true && this.path[neighbors[i].y][neighbors[i].x] === this.path[currentPosition.y][currentPosition.x] - 1) {
					shortestPath.push(neighbors[i]);
					break;
				}
			}
		}
		return shortestPath;
	}

	private initialize() {
		this.path = [];
		this.visited = [];

		for (let y = 0; y < this.grid.height; y++) {
			this.path[y] = [];
			this.visited[y] = [];
			for (let x = 0; x < this.grid.width; x++) {
				this.path[y][x] = 0;
				this.visited[y][x] = false;
			}
		}
	}
	public Dfs(startPosition: ICell, goalPosition: ICell): void {
		this.startPosition = startPosition;
		this.goalPosition = goalPosition;
		this.initialize();
		const queue = new Queue<ICell>();
		queue.Push(startPosition);
		while (queue.Size() > 0) {
			let currentPosition: ICell = queue.Pop();
			this.visited[currentPosition.y][currentPosition.x] = true;
			if (currentPosition.x === goalPosition.x && currentPosition.y === goalPosition.y) {
				break;
			}
			let neighbors: ICell[] = currentPosition.GetNeighbors();
			for (let i = 0; i < neighbors.length; i++) {
				if (neighbors[i].Facility && neighbors[i].Facility.type === FacilityType.Wall) {
					continue;
				}

				if (this.visited[neighbors[i].y][neighbors[i].x] === false) {
					this.visited[neighbors[i].y][neighbors[i].x] = true;
					this.path[neighbors[i].y][neighbors[i].x] = this.path[currentPosition.y][currentPosition.x] + 1;
					queue.Push(neighbors[i]);
				}
			}
		}
	}
}

class Queue<T> {
	_store: T[] = [];
	Push(val: T) {
		this._store.push(val);
	}
	Pop(): T | undefined {
		return this._store.shift();
	}
	Size(): number | undefined {
		return this._store.length;
	}
}
