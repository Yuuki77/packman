import { expect } from 'chai';
import { assert } from 'chai';
import 'mocha';
import { Grid } from "../game/logic/grid";
import { ContentType, Direction } from "../game/interfaces/interfaces";
import { PathFinding } from "../game/logic/pathFind/pathFind";
import { Helpers } from "./helpers";
import { GREENENEMY_POSITION } from "../game/const";

describe('BFS function', () => {
	it('should return path', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);
		let enemy = helpers.getContent(grid, ContentType.Enemy);
		let breadthFirstPathFind = new PathFinding(grid);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		assert(enemy);
		assert.equal(enemy.Type, ContentType.Enemy);

		breadthFirstPathFind.Dfs(player.Cell, enemy.Cell);
		let path = breadthFirstPathFind.GetPath();
		expect(path.length).to.equal(4);
		expect(path[1]).to.equal(grid.GetCell(0, 1));
	});
});

describe('TEST Move function in grid', () => {
	it('should Move left', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		grid.Move(player, grid.GetCell(player.x - 1, player.y));
	});
});

describe('TEST Move function in grid', () => {
	it('should Move left', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		grid.Move(player, grid.GetCell(player.x - 1, player.y));
	});
});

describe('TEST CanMove function in player', () => {
	it('should  not Move left', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		assert.strictEqual(player.CannotMove(player, nextCell), false, 'should not go up');
	});
});

describe('TEST GetNextCell ', () => {
	it('should  move right edge', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let getNextCell = player.Cell.GetNeightbor(Direction.Right);
		let nextCell = player.GetNextCell(player, getNextCell)
		expect(nextCell).to.equal(grid.GetCell(0, 1));
	});

	it('should  move left edge', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[3, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let getNextCell = player.Cell.GetNeightbor(Direction.Left);
		let nextCell = player.GetNextCell(player, getNextCell)
		expect(nextCell).to.equal(grid.GetCell(2, 1));
	});
});

describe('TEST CanMove function in player', () => {
	it('should  not Move left', () => {
		let GridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		assert.strictEqual(player.CannotMove(player, nextCell), false, 'should not go up');
	});
});