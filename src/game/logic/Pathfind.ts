import { IGrid, ICellContent, ICell, ContentType, Direction, IPathFinding } from '../interfaces/interfaces';

export class BreadthFirstPathFind implements IPathFinding {
  readonly grid: IGrid;
	path: number [][];
  visited: boolean [][];
  private startPosition:ICell;
  private goalPostion: ICell;

	constructor(){
	}

  public getPath() {
    let shortestPath = [];
    shortestPath.push(this.goalPostion);
    let count = 0
    while(true) {
      let currentPosiotion: ICell = shortestPath[shortestPath.length -1];
      if (currentPosiotion.x === this.startPosition.x && currentPosiotion.y === this.startPosition.y) {
          break;
      }
      let neightbors : ICell [] = currentPosiotion.GetNeightbors();
      for (var i = 0; i < neightbors.length; i++) {
        if (neightbors[i].Content && neightbors[i].Content.Type === ContentType.Wall) {
          continue;
        }
          if (this.visited[neightbors[i].x][neightbors[i].y] == true && this.path[neightbors[i].x][neightbors[i].y] === this.path[currentPosiotion.x][currentPosiotion.y] -1) {
            shortestPath.push(neightbors[i]);
            break;
          }
      }
    }
    return shortestPath;
  }
  private initialize() {
    this.path = [];
    this.visited = [];

    let width = 24;
    let height = 16;
    for (var x = 0; x < width; x++) {
      this.path[x] = [];
      this.visited [x] = [];
      for (var y = 0; y < height; y++) {
        this.path[x][y] = 0;
        this.visited[x][y] = false;
      }
    }
  }
	public Dfs(startPosition: ICell, goalPostion: ICell) : void
	{
    this.startPosition = startPosition;
    this.goalPostion = goalPostion;
    this.initialize();
		const queue = new Queue <ICell>();
		queue.push(startPosition);
		while (queue.size() > 0)
		{
			let currentPosiotion: ICell = queue.pop();
      this.visited[currentPosiotion.x][currentPosiotion.y] = true;
      if (currentPosiotion.x === goalPostion.x && currentPosiotion.y === goalPostion.y) {
          break;
      }
      let neightbors : ICell [] = currentPosiotion.GetNeightbors();
			for (var i = 0; i < neightbors.length; i++) {
          if (neightbors[i].Content &&neightbors[i].Content.Type === ContentType.Wall) {
            continue;
          }
          if (this.visited[neightbors[i].x][neightbors[i].y] == false) {
            this.visited[neightbors[i].x][neightbors[i].y] = true;
            this.path[neightbors[i].x][neightbors[i].y] = this.path[currentPosiotion.x][currentPosiotion.y] +1;
            queue.push(neightbors[i]);
          }
      }
		}
	}
}

class Queue<T> {
  _store: T[] = [];
  push(val: T) {
    this._store.push(val);
  }
  pop(): T | undefined {
    return this._store.shift();
  }
	size() : number | undefined {
		return this._store.length;
	}
}
