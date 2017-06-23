import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import { Grid } from '../game/logic/grid';
import { ContentType, Direction, IPlayer, EnemyType } from '../game/interfaces/interfaces';
import { PathFinding } from '../game/logic/pathFind/pathFind';
import { Helpers } from './helpers';
import { GREEN_ENEMY_POSITION, PACKGUM_POSITION, PLAYER_POSITION, BLUE_ENEMY_POSITION } from '../game/const';
import { Player } from '../game/logic/grid/contents/player';
import { Enemy } from '../game/logic/grid/contents/enemy';
import { GreenEnemyController } from '../game/logic/enemyManager/controllers/greenController';

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
				[0, 0, GREEN_ENEMY_POSITION],
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
		let nextCell = player.GetNextCell(player, (Direction.Right));
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
		let player = playerContent as Player;
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
	it('should not go down', () => {
		let GridData: number[][] =
			[
				[0, 1, BLUE_ENEMY_POSITION],
				[PLAYER_POSITION, 0, GREEN_ENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let blue = grid.GetCell(2, 0).Content;
		let blueEnemy = blue as Enemy;

		assert(blueEnemy);
		expect(blueEnemy.Type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let enemyController = new GreenEnemyController(grid, player, grid.GetCell(2, 1).Content);
		let nextCell = blueEnemy.Cell.GetNeightbor(Direction.Down);
		expect(nextCell).to.equal(grid.GetCell(2, 1));
		expect(enemyController.CanMove(nextCell)).to.equal(false);
		console.log(grid.toString());
	});
});

describe('TEST Player IsPackGUm', () => {
	it('should eat packGum', () => {
		let GridData: number[][] =
			[
				[PACKGUM_POSITION, 1, 0],
				[PLAYER_POSITION, 0, 0],
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
		expect(nextCell).to.equal(grid.GetCell(0, 0));
		expect(grid.GetCell(0, 0).Facility.Visited).to.equal(false);
		console.log('Before');
		console.log(grid.toString());
		// player.Decide(player, Direction.Up);

		expect(grid.GetCell(0, 0).Content.Type).to.equal(ContentType.Player);
		expect(grid.GetCell(0, 0).Facility.Visited).to.equal(true);
		expect(grid.GetCell(0, 1).Content).to.equal(undefined);
		console.log();
		console.log('After');
		console.log(grid.toString());
	});
});

describe('TEST SpecialItemEaten Enemy', () => {
	it('should get ran away', () => {
		let GridData: number[][] =
			[
				[BLUE_ENEMY_POSITION, 1, 0],
				[0, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let enemy = enemyContent as Player;

		assert(enemy);
		expect(enemy.Type).to.equal(ContentType.Enemy);

		let nextCell = enemy.Cell.GetNeightbor(Direction.Down);

		console.log('Before');
		console.log(grid.toString());

		let breadthFirstPathFind = new PathFinding(grid);
		breadthFirstPathFind.Dfs(nextCell.GetNeightbor(Direction.Right), enemy.Cell);
		let path = breadthFirstPathFind.GetPath();

		expect(nextCell).to.equal(path[1]);
		grid.Move(enemy, nextCell);
		console.log('After');
		console.log(grid.toString());
	});
});

describe('TEST EnemyController  GetFarPath', () => {
	it('should get Far path', () => {
		let GridData: number[][] =
			[
				[0, 1, BLUE_ENEMY_POSITION],
				[PLAYER_POSITION, 0, GREEN_ENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let blue = grid.GetCell(2, 0).Content;
		let blueEnemy = blue as Enemy;

		assert(blueEnemy);
		expect(blueEnemy.Type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		let enemyController = new GreenEnemyController(grid, player, grid.GetCell(2, 1).Content);
	});
});

describe('TEST Player eatEnemy', () => {
	it('should enemy Eat', () => {
		let GridData: number[][] =
			[
				[0, 1, 0],
				[PLAYER_POSITION, GREEN_ENEMY_POSITION, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let blue = helpers.getContent(grid, ContentType.Enemy);
		let blueEnemy = blue as Enemy;
		blueEnemy.Run = true;

		assert(blueEnemy);
		expect(blueEnemy.Type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		console.log('Before');
		console.log(grid.toString());
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);

		console.log('After');
		console.log(grid.toString());
	});
});

describe('TEST Check if game is clear or not', () => {
	it('should game clear', () => {
		let GridData: number[][] =
			[
				[PLAYER_POSITION, 0, 0],
				[1, 1, 1],
				[1, 1, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		expect(grid.IsGameClear()).to.equal(false);
		console.log(grid.visitedDotNumbers);
		console.log('Before');
		console.log(grid.toString());
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);
		expect(grid.IsGameClear()).to.equal(false);

		nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);

		console.log('After');
		console.log(grid.toString());
		console.log('dots', grid.numberOfDots);
		console.log('visited', grid.visitedDotNumbers);
		expect(grid.IsGameClear()).to.equal(true);

	});
});


describe('TEST Check if game is clear or not', () => {
	it('should game clear', () => {
		let GridData: number[][] =
			[
				[PLAYER_POSITION, 9, 0],
				[1, 1, 1],
				[1, 1, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		expect(grid.IsGameClear()).to.equal(false);
		console.log(grid.visitedDotNumbers);
		console.log('Before');
		console.log(grid.toString());
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);
		expect(grid.IsGameClear()).to.equal(false);

		nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);

		console.log('After');
		console.log(grid.toString());
		console.log('dots', grid.numberOfDots);
		console.log('visited', grid.visitedDotNumbers);
		expect(grid.IsGameClear()).to.equal(true);
	});
});



describe('TEST Check if game is clear or not', () => {
	it('should game clear', () => {
		let GridData: number[][] =
			[
				[PLAYER_POSITION, 9, 0],
				[1, 1, 1],
				[1, 1, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.Type).to.equal(ContentType.Player);

		expect(grid.IsGameClear()).to.equal(false);
		console.log(grid.visitedDotNumbers);
		console.log('Before');
		console.log(grid.toString());
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);
		expect(grid.IsGameClear()).to.equal(false);

		nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);

		console.log('After');
		console.log(grid.toString());
		console.log('dots', grid.numberOfDots);
		console.log('visited', grid.visitedDotNumbers);
		expect(grid.IsGameClear()).to.equal(true);
	});
});

describe('TEST Check if there is a collision go home ', () => {
	it('should game clear', () => {
		let GridData: number[][] =
			[
				[0, 9, 0],
				[GREEN_ENEMY_POSITION, 1, 1],
				[BLUE_ENEMY_POSITION, 1, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(GridData);

		grid.CreateBoard();

		let enemyContent = grid.GetCell(0, 2);
		assert(enemyContent);
		expect(enemyContent.Content.EnemyType).to.equal(EnemyType.Blue);

		let enemy = enemyContent.Content as Enemy;
		// let enemyController = new GreenEnemyController(grid, enem, grid.GetCell(2, 1).Content);
		enemy.Run = true;

		console.log('Before');
		console.log(grid.toString());
		let nextCell = enemy.Cell.GetNeightbor(Direction.Up);
		grid.Move(enemy, nextCell);
		expect(grid.IsGameClear()).to.equal(false);

		console.log(nextCell.Content.EnemyType);
		expect(nextCell.Content.EnemyType).to.equal(EnemyType.Blue);

		console.log('After');
		console.log(grid.toString());

	});
});