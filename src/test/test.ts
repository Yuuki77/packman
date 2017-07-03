import { assert } from 'chai';
import { expect } from 'chai';
import 'mocha';
import { BLUE_ENEMY_POSITION, GREEN_ENEMY_POSITION, PACKGUM_POSITION, PLAYER_POSITION, RED_ENEMY_POSITION } from '../game/const';
import { ContentType, Direction, EnemyType } from '../game/interfaces/interfaces';
import { GreenEnemyController } from '../game/logic/enemyManager/controllers/greenController';
import { RedEnemyController } from '../game/logic/enemyManager/controllers/redController';
import { BlueEnemyController } from '../game/logic/enemyManager/controllers/blueController';
import { Grid } from '../game/logic/grid';
import { Enemy } from '../game/logic/grid/contents/enemy';
import { Player } from '../game/logic/grid/contents/player';
import { PathFinding } from '../game/logic/pathFind/pathFind';
import { FakeGridUi, Helpers } from './helpers';

describe('BFS function', () => {
	it('should return path', () => {
		let gridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let player = helpers.getContent(grid, ContentType.Player);
		let enemy = helpers.getContent(grid, ContentType.Enemy);
		let breadthFirstPathFind = new PathFinding(grid);

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		assert(enemy);
		assert.equal(enemy.type, ContentType.Enemy);

		breadthFirstPathFind.Dfs(player.Cell, enemy.Cell);
		let path = breadthFirstPathFind.GetPath();
		expect(path.length).to.equal(4);
		expect(path[1]).to.equal(grid.GetCell(0, 1));
	});
});

describe('TEST Move function in grid', () => {
	it('should Move left', () => {
		let gridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		grid.Move(player, grid.GetCell(player.x - 1, player.y));
	});
});

describe('TEST Move function in grid', () => {
	it('should Move right', () => {
		let gridData: number[][] =
			[
				[PLAYER_POSITION, 1, 1],
				[0, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		assert.strictEqual(player.CannotMove(player, nextCell), true, 'should not go right');
	});
});

describe('TEST CanMove function in player', () => {
	it('should  not Move up', () => {
		let gridData: number[][] =
			[
				[PLAYER_POSITION, 1, 1],
				[0, 0, GREEN_ENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);
		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		assert.strictEqual(player.CannotMove(player, nextCell), true, 'should not go up');
	});
});

describe('TEST GetNextCell ', () => {
	it('should  move right edge', () => {
		let gridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);
		let nextCell = player.GetNextCell(player, (Direction.Right));
		expect(nextCell).to.equal(grid.GetCell(0, 1));
	});

	it('should  move left edge', () => {
		let gridData: number[][] =
			[
				[5, 1, 1],
				[3, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let nextCell = player.GetNextCell(player, Direction.Left);
		expect(nextCell).to.equal(grid.GetCell(2, 1));
	});
});

describe('TEST CanMove function in player', () => {
	it('should  not Move left', () => {
		let gridData: number[][] =
			[
				[5, 1, 1],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		assert.strictEqual(player.CannotMove(player, nextCell), true, 'should not go up');
	});
});

describe('TEST Player Can Eat packgum', () => {
	it('should return proper boolean', () => {
		let gridData: number[][] =
			[
				[5, 1, PACKGUM_POSITION],
				[0, 0, 3],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();
		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		expect(player.IsPackGum(nextCell)).to.equal(true);

		nextCell = player.Cell.GetNeightbor(Direction.Down);
		expect(player.IsPackGum(nextCell)).to.equal(false);
	});
});

describe('TEST Enemy CanNotMove function', () => {
	it('should not go down', () => {
		let gridData: number[][] =
			[
				[0, 1, BLUE_ENEMY_POSITION],
				[PLAYER_POSITION, 0, GREEN_ENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let blue = grid.GetCell(2, 0).Content;
		let blueEnemy = blue as Enemy;

		assert(blueEnemy);
		expect(blueEnemy.type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemy = grid.GetCell(2, 1).Content as Enemy;
		let enemyController = new GreenEnemyController(grid, player, enemy);
		let nextCell = blueEnemy.Cell.GetNeightbor(Direction.Down);
		expect(nextCell).to.equal(grid.GetCell(2, 1));
		expect(enemyController.CanMove(nextCell)).to.equal(false);
		console.log(grid.toString());
	});
});

describe('TEST Player IsPackGUm', () => {
	it('should eat packGum', () => {
		let gridData: number[][] =
			[
				[PACKGUM_POSITION, 1, 0],
				[PLAYER_POSITION, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let nextCell = player.Cell.GetNeightbor(Direction.Up);
		expect(nextCell).to.equal(grid.GetCell(0, 0));
		expect(grid.GetCell(0, 0).Facility.Visited).to.equal(false);
		console.log('Before');
		console.log(grid.toString());
		// player.Decide(player, Direction.Up);
		grid.Move(player, nextCell);
		console.log(grid.GetCell(0, 0).Content);
		expect(grid.GetCell(0, 0).Content.type).to.equal(ContentType.Player);
		expect(grid.GetCell(0, 1).Content).to.equal(undefined);
		console.log();
		console.log('After');
		console.log(grid.toString());
	});
});

describe('TEST SpecialItemEaten Enemy', () => {
	it('should get ran away', () => {
		let gridData: number[][] =
			[
				[BLUE_ENEMY_POSITION, 1, 0],
				[0, 0, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let enemy = enemyContent as Player;

		assert(enemy);
		expect(enemy.type).to.equal(ContentType.Enemy);

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
		let gridData: number[][] =
			[
				[0, 1, BLUE_ENEMY_POSITION],
				[PLAYER_POSITION, 0, GREEN_ENEMY_POSITION],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let blue = grid.GetCell(2, 0).Content;
		let blueEnemy = blue as Enemy;

		assert(blueEnemy);
		expect(blueEnemy.type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

	});
});

describe('TEST Player eatEnemy', () => {
	it('should enemy Eat', () => {
		let gridData: number[][] =
			[
				[0, 1, 0],
				[PLAYER_POSITION, GREEN_ENEMY_POSITION, 0],
				[1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		let blue = helpers.getContent(grid, ContentType.Enemy);
		let blueEnemy = blue as Enemy;
		blueEnemy.Run = true;

		assert(blueEnemy);
		expect(blueEnemy.type).to.equal(ContentType.Enemy);

		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		console.log('Before');
		console.log(grid.toString());
		let nextCell = player.Cell.GetNeightbor(Direction.Right);
		grid.Move(player, nextCell);

		console.log('After');
		console.log(grid.toString());
	});
});

// describe('TEST Check if game is clear or not', () => {
// 	it('should game clear', () => {
// 		let gridData: number[][] =
// 			[
// 				[PLAYER_POSITION, 0, 0],
// 				[1, 1, 1],
// 				[1, 1, 1]
// 			];
// 		let helpers = new Helpers();
// 		let grid = new Grid(gridData);
// 		grid.CreateBoard();

// 		let playerContent = helpers.getContent(grid, ContentType.Player);
// 		let player = playerContent as Player;

// 		assert(player);
// 		expect(player.Type).to.equal(ContentType.Player);

// 		expect(grid.IsGameClear()).to.equal(false);
// 		console.log(grid.visitedDotNumbers);

// 		expect(grid.visitedDotNumbers).to.equal(0);
// 		expect(grid.numberOfDots).to.equal(2);

// 		console.log('Before');
// 		console.log(grid.toString());
// 		let nextCell = player.Cell.GetNeightbor(Direction.Right);
// 		grid.Move(player, nextCell);

// 		expect(grid.visitedDotNumbers).to.equal(1);
// 		expect(grid.IsGameClear()).to.equal(false);

// 		nextCell = player.Cell.GetNeightbor(Direction.Right);
// 		grid.Move(player, nextCell);

// 		console.log('After');
// 		console.log(grid.toString());
// 		console.log('dots', grid.numberOfDots);
// 		console.log('visited', grid.visitedDotNumbers);
// 		expect(grid.IsGameClear()).to.equal(true);
// 	});
// });

describe('TEST Check if there is a collision go home ', () => {
	it('should game clear', () => {
		let gridData: number[][] =
			[
				[0, 9, 0],
				[GREEN_ENEMY_POSITION, 1, 1],
				[BLUE_ENEMY_POSITION, 1, 1]
			];

		let grid = new Grid(gridData);

		grid.CreateBoard();

		let enemyContent = grid.GetCell(0, 2);
		assert(enemyContent);
		expect(enemyContent.Content.enemyType).to.equal(EnemyType.Blue);

		let enemy = enemyContent.Content as Enemy;
		enemy.Run = true;

		console.log('Before');
		console.log(grid.toString());
		let nextCell = enemy.Cell.GetNeightbor(Direction.Up);
		grid.Move(enemy, nextCell);
		expect(grid.IsGameClear()).to.equal(false);

		console.log(nextCell.Content.enemyType);
		expect(nextCell.Content.enemyType).to.equal(EnemyType.Blue);

		console.log('After');
		console.log(grid.toString());
	});
});

describe('TEST Check if Enemy go to player position', () => {
	it('enemy should go to player position', () => {
		let gridData: number[][] =
			[
				[RED_ENEMY_POSITION, 0, 0, 0, PLAYER_POSITION],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		// tslint:disable-next-line:no-unused-new
		new FakeGridUi(grid);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let redEnemy = enemyContent as Enemy;

		assert(redEnemy);
		expect(redEnemy.type).to.equal(ContentType.Enemy);

		console.log('Before');
		console.log(grid.toString());
		let enemyController = new RedEnemyController(grid, player, redEnemy);
		enemyController.Random = 0;
		enemyController.Update(25);

		expect(grid.GetCell(1, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('After');
		console.log(grid.toString());

		expect(enemyController.thinkingTime).to.equal(0);
		enemyController.Update(25);
		expect(grid.GetCell(2, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('After');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('After');
		console.log(grid.toString());
	});
});

describe('TEST Check if red Enemy walks around or not', () => {
	it('enemy should go to player position', () => {
		let gridData: number[][] =
			[
				[RED_ENEMY_POSITION, 0, 0, 0, PLAYER_POSITION],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		new FakeGridUi(grid);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let redEnemy = enemyContent as Enemy;

		assert(redEnemy);
		expect(redEnemy.type).to.equal(ContentType.Enemy);

		console.log('Before');
		console.log(grid.toString());
		let enemyController = new RedEnemyController(grid, player, redEnemy);
		enemyController.Random = 1;
		enemyController.Update(25);

		expect(grid.GetCell(1, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('1');
		console.log(grid.toString());

		expect(enemyController.thinkingTime).to.equal(0);
		enemyController.Update(25);
		expect(grid.GetCell(2, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('2');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('3');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 1).Content.type).to.equal(ContentType.Enemy);

		console.log('4');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 2).Content.type).to.equal(ContentType.Enemy);

		console.log('5');
		console.log(grid.toString());

		enemyController.Update(25);
		// expect(grid.GetCell(4, 1).Content.Type).to.equal(ContentType.Enemy);

		console.log('6');
		console.log(grid.toString());

		for (let i = 0; i < 10; i++) {
			enemyController.Update(25);
			console.log(7 + i);
			console.log(grid.toString());
		}
		// expect(grid.GetCell(3, 1).Content.type).to.equal(ContentType.Enemy);
	});
});


describe('TEST Check if red Enemy walks around flag works or not', () => {
	it('enemy should walk Around', () => {
		let gridData: number[][] =
			[
				[RED_ENEMY_POSITION, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[PLAYER_POSITION, 1, 1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		new FakeGridUi(grid);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let redEnemy = enemyContent as Enemy;

		assert(redEnemy);
		expect(redEnemy.type).to.equal(ContentType.Enemy);

		console.log('Before');
		console.log(grid.toString());
		let enemyController = new RedEnemyController(grid, player, redEnemy);
		enemyController.MovingTimes = 30;
		enemyController.Update(25);

		expect(grid.GetCell(1, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('12');
		console.log(grid.toString());

		expect(enemyController.thinkingTime).to.equal(0);
		enemyController.Update(25);
		expect(grid.GetCell(2, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('2');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('3');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 1).Content.type).to.equal(ContentType.Enemy);
	});
});

describe('TEST Check if red Enemy walks around flag works or not', () => {
	it('enemy should walk Around', () => {
		let gridData: number[][] =
			[
				[RED_ENEMY_POSITION, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[PLAYER_POSITION, 1, 1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		new FakeGridUi(grid);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let redEnemy = enemyContent as Enemy;

		assert(redEnemy);
		expect(redEnemy.type).to.equal(ContentType.Enemy);

		console.log('Before');
		console.log(grid.toString());
		let enemyController = new RedEnemyController(grid, player, redEnemy);
		expect(grid.GetCell(0, 0).Content.type).to.equal(ContentType.Enemy);
		enemyController.Random = 0;
		enemyController.MovingTimes = 1;
		enemyController.Update(25);

		expect(grid.GetCell(0, 1).Content.type).to.equal(ContentType.Enemy);

		console.log('1');
		console.log(grid.toString());

		expect(enemyController.thinkingTime).to.equal(0);
		enemyController.Update(25);
		expect(grid.GetCell(0, 2).Content.type).to.equal(ContentType.Enemy);

		console.log('2');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(0, 3).Content.type).to.equal(ContentType.Enemy);

		console.log('3');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(0, 4).Content.type).to.equal(ContentType.Enemy);
	});
});


describe('TEST Check if blue Enemy walks around flag works or not', () => {
	it('enemy should walk Around', () => {
		let gridData: number[][] =
			[
				[BLUE_ENEMY_POSITION, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[PLAYER_POSITION, 1, 1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		new FakeGridUi(grid);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let blue = enemyContent as Enemy;

		assert(blue);
		expect(blue.type).to.equal(ContentType.Enemy);

		console.log('Before');
		console.log(grid.toString());
		let enemyController = new BlueEnemyController(grid, player, blue);
		enemyController.Update(25);

		expect(grid.GetCell(1, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('1');
		console.log(grid.toString());

		expect(enemyController.thinkingTime).to.equal(0);
		enemyController.Update(25);
		expect(grid.GetCell(2, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('2');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 0).Content.type).to.equal(ContentType.Enemy);

		console.log('3');
		console.log(grid.toString());

		enemyController.Update(25);
		expect(grid.GetCell(3, 1).Content.type).to.equal(ContentType.Enemy);
	});
});

describe('TEST Check if blue Enemy walks around flag works or not', () => {
	it('enemy should walk Around', () => {
		let gridData: number[][] =
			[
				[BLUE_ENEMY_POSITION, PLAYER_POSITION, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 0, 0, 0, 1],
				[0, 1, 1, 0, 1],
				[0, 1, 1, 0, 1]
			];
		let helpers = new Helpers();
		let grid = new Grid(gridData);
		new FakeGridUi(grid);
		grid.CreateBoard();

		let playerContent = helpers.getContent(grid, ContentType.Player);
		let player = playerContent as Player;
		assert(player);
		expect(player.type).to.equal(ContentType.Player);

		let enemyContent = helpers.getContent(grid, ContentType.Enemy);
		let blue = enemyContent as Enemy;

		assert(blue);
		expect(blue.type).to.equal(ContentType.Enemy);

		console.log('Before');
		console.log(grid.toString());
		let enemyController = new BlueEnemyController(grid, player, blue);
		enemyController.Random = 0;
		enemyController.MovingTimes = 1;
		enemyController.Update(25);

		console.log('1');
		console.log(grid.toString());

		expect(player.Alive).to.equal(false);
	});
});
