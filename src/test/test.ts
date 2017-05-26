import { Grid } from '../game/logic/grid';
import { ICellContent, Direction, ContentType, FacilityType } from '../game/interfaces/interfaces';
import { PathFinding } from '../game/logic/pathFind/pathFind';
import { Helpers } from './helpers';
import { GridData } from '../game/const';

export class Test {
	game;
	player: ICellContent;
	enemy: ICellContent;
	helpers;
	constructor(game: Phaser.Game) {
		this.game = game;
		this.helpers = new Helpers();
		this.testBfs();
		this.testBfs2();
		this.testGetCell();
		this.testMove();
		this.testMoveToWall();
		// this.TestEnemyEatPlayer();
		this.TestIsPlayer();
		this.TestIsSameContent();
	}

	public testBfs(): void {
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = this.helpers.getContent(grid, ContentType.Player);
		let enemy = this.helpers.getContent(grid, ContentType.Enemy);
		let breadthFirstPathFind = new PathFinding(grid);
		// todo assertion.

		this.helpers.assert(player);
		this.helpers.assert(enemy);
		this.helpers.assert(breadthFirstPathFind);

		console.log(player, enemy, 'you got it?');
		console.log(breadthFirstPathFind.Dfs(player.Cell, enemy.Cell));
		console.log('get path is ', breadthFirstPathFind.GetPath());
	}

	public testBfs2(): void {
		console.log("test bfs2");
		let grid = new Grid(GridData);
		let paths = [];
		grid.CreateBoard();
		let player = this.helpers.getContent(grid, ContentType.Player);
		let enemysArray = this.helpers.findAllEnemys(grid, ContentType.Enemy);
		let breadthFirstPathFind = new PathFinding(grid);

		this.helpers.assert(player);
		this.helpers.assert(enemysArray);

		console.log("enemy", enemysArray);
		for (let enemy of enemysArray) {
			breadthFirstPathFind.Dfs(player.Cell, enemy.Cell);
			paths.push(breadthFirstPathFind.GetPath());
		};
		console.log('path is ', paths);
	}

	public testGetCell(): void {
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 0, 3],
				[1, 0, 1]
			];

		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(player);


		if (grid.GetCell(0, 0).Facility.Type !== FacilityType.Wall) {
			throw new Error('it should be wall' + grid.GetCell(0, 0).Facility.Type);
		}

		if (grid.GetCell(2, 1).Content.Type !== ContentType.Player) {
			throw new Error('it should be player' + grid.GetCell(0, 0).Content);
		}
	}

	public testMove(): void {
		console.log("TEST MOVE ");
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 0, 3],
				[1, 0, 1]
			];

		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(player);

		grid.Move(player, Direction.Left);

		let previousPosition = grid.GetCell(player.Cell.x - 1, player.Cell.y);
		let nextPosition = grid.GetCell(player.Cell.x, player.Cell.y);

		if (nextPosition.Content.Type !== ContentType.Player) {
			throw new Error('move left fail' + nextPosition.Content);
		}

		if (previousPosition.Content !== undefined) {
			throw new Error('move left fail' + previousPosition.Content);
		}
	}

	public testMoveToWall(): void {
		console.log("TEST testMoveToWall ");
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 0, 3],
				[1, 0, 1]
			];

		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(player);

		grid.Move(player, Direction.Up);

		let previousPosition = grid.GetCell(player.Cell.x, player.Cell.y - 1);
		let nextPosition = grid.GetCell(player.Cell.x, player.Cell.y);

		if (nextPosition.Content.Type !== ContentType.Player) {
			throw new Error('move left fail' + nextPosition.Content);
		}

		if (previousPosition.Content !== undefined) {
			throw new Error('move left fail' + previousPosition.Content);
		}
	}

	public TestMoveGoAndBack(): void {
		console.log("TEST testMoveToWall ");
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 0, 3],
				[1, 0, 1]
			];

		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(player);

		grid.Move(player, Direction.Left);

		let previousPosition = grid.GetCell(player.Cell.x + 1, player.Cell.y);
		let nextPosition = grid.GetCell(player.Cell.x, player.Cell.y);

		if (nextPosition.Content.Type !== ContentType.Player) {
			throw new Error('move left fail' + nextPosition.Content);
		}

		if (previousPosition.Content !== undefined) {
			throw new Error('move left fail' + previousPosition.Content);
		}

		grid.Move(player, Direction.Right);

		previousPosition = grid.GetCell(player.Cell.x + 1, player.Cell.y);
		nextPosition = grid.GetCell(player.Cell.x, player.Cell.y);

		if (nextPosition.Content.Type !== ContentType.Player) {
			throw new Error('move right fail' + nextPosition.Content);
		}

		if (previousPosition.Content !== undefined) {
			throw new Error('move right fail' + previousPosition.Content);
		}
	}

	public TestEnemyEatPlayer(): void {
		console.log("TEST TestEnemyEatPlayer ");
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 5, 3],
				[1, 0, 1]
			];

		let grid = new Grid(GridData);
		grid.CreateBoard();
		let enemy = this.helpers.getContent(grid, ContentType.Enemy);
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(enemy);
		this.helpers.assert(player);

		grid.Move(enemy, Direction.Left);

		if (player.alive) {
			throw new Error("eat player fail");
		}
	}

	public Test(): void {
		console.log("TEST TestEnemyEatPlayer ");
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 5, 3],
				[1, 0, 1]
			];

		let grid = new Grid(GridData);
		grid.CreateBoard();
		let enemy = this.helpers.getContent(grid, ContentType.Enemy);
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(enemy);
		this.helpers.assert(player);

		grid.Move(enemy, Direction.Left);

		if (player.alive) {
			throw new Error("eat player fail");
		}
	}

	public TestIsPlayer() {
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 5, 3],
				[1, 0, 1]
			];
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let enemy = this.helpers.getContent(grid, ContentType.Enemy);
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(enemy);
		this.helpers.assert(player);

		if (!this.helpers.IsPlayer(player.Cell)) {
			throw new Error("TEST IS Plauer fall");
		}

		if (this.helpers.IsPlayer(enemy.Cell)) {
			throw new Error("TEST isPlayer enemy true");
		}
	}

	public TestIsSameContent() {
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 5, 3],
				[1, 0, 1]
			];
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let enemy = this.helpers.getContent(grid, ContentType.Enemy);
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(enemy);
		this.helpers.assert(player);

		if (this.helpers.IsSameContent(player.Cell, enemy.Cell)) {
			throw new Error();
		}

		if (!this.helpers.IsSameContent(player.Cell, player.Cell)) {
			throw new Error();
		}
	}

	public TestIsFacility() {
		let GridData: number[][] =
			[
				[1, 1, 1],
				[1, 5, 3],
				[1, 0, 1]
			];
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let enemy = this.helpers.getContent(grid, ContentType.Enemy);
		let player = this.helpers.getContent(grid, ContentType.Player);
		this.helpers.assert(enemy);
		this.helpers.assert(player);


		if (!this.helpers.IsThisContent(player.Cell, ContentType.Player)) {
			throw new Error("TEST IS player fall");
		}

		if (!this.helpers.IsThisFacility(grid.GetCell(0,0), FacilityType.Wall)) {
			throw new Error("TEST isPlayer enemy true");
		}
	}
}
