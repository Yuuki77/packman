import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import { Grid } from "../game/logic/grid";
import { ContentType, Direction, IPlayer } from "../game/interfaces/interfaces";
import { PathFinding } from "../game/logic/pathFind/pathFind";
import { Helpers } from "./helpers";
import { GREENENEMY_POSITION, PACKGUM_POSITION, PLAYER_POSITION, BLEUENEMY_POSITION } from "../game/const";
import { Player } from "../game/logic/grid/contents/player";
import { Enemy } from "../game/logic/grid/contents/enemy";
import { GreenEnemyController } from "../game/logic/enemyManager/controllers/greenController";

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
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		grid.Move(player, grid.GetCell(player.x - 1, player.y));
	});
});

describe('TEST Move function in grid', () => {
	it('should Move right', () => {
		let GridData: number[][] =
			[
				[PLAYER_POSITION, 1, 1],
				[0, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		assert.strictEqual(player.CannotMove(player, nextCell), true, 'should not go right');
	});
});

describe('TEST CanMove function in player', () => {
	it('should  not Move up', () => {
		let GridData: number[][] =
			[
				[PLAYER_POSITION, 1, 1],
				[0, 0, GREENENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);
		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		assert.strictEqual(player.CannotMove(player, nextCell), true, 'should not go up');
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
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);
		let nextCell = player.GetNextCell(player, (Direction.Right))
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
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player
		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let nextCell = player.GetNextCell(player, Direction.Left);
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
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		assert.strictEqual(player.CannotMove(player, nextCell), true, 'should not go up');
	});
});

describe('TEST Player Can Eat packgum', () => {
	it('should return proper boolean', () => {
		let GridData: number[][] =
			[
				[5, 1, PACKGUM_POSITION],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		expect(player.IsPackGum(nextCell)).to.equal(true);

		nextCell = player.Cell.GetNeightbor(Direction.Down);
		expect(player.IsPackGum(nextCell)).to.equal(false);
	});
});

describe('TEST Enemy CanNotMove function', () => {
	it('should return false', () => {
		let GridData: number[][] =
			[
				[0, 1, 0],
				[PLAYER_POSITION, 0, GREENENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
		
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let enemy = enemyContent as Enemy;

		assert(enemy);
		expect(enemy.Type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let enemyController = new GreenEnemyController(grid, player, enemy);

		let nextCell = enemy.Cell.GetNeightbor(Direction.Up);
		assert(nextCell);
		expect(enemyController.CanNotMove(nextCell)).to.equal(false);

		nextCell = player.Cell.GetNeightbor(Direction.Down);
		expect(player.IsPackGum(nextCell)).to.equal(false);
	});

	it('should return false', () => {
		let GridData: number[][] =
			[
				[PLAYER_POSITION, 1, BLEUENEMY_POSITION],
				[0, 0, GREENENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();
	
	
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = helpers.getContent(grid, ContentType.Player);
		let enemyContent = grid.GetCell(2,1).Content;
		let enemy = enemyContent as Enemy;

		assert(enemy);
		expect(enemy.Type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);
		expect(grid.GetCell(2,1).Content.Type).to.equal(ContentType.Enemy);

		let enemyController = new GreenEnemyController(grid, player, grid.GetCell(2,0).Content);

		let nextCell = enemy.Cell.GetNeightbor(Direction.Up);
		assert(nextCell.Content);
		expect(enemyController.CanNotMove(nextCell)).to.equal(true);

		nextCell = player.Cell.GetNeightbor(Direction.Left);
		expect(enemyController.CanNotMove(nextCell)).to.equal(false);
	});
});
