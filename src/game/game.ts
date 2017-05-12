import { GridData } from './const';
import { Grid } from './logic/grid';
import { EnemyController } from './logic/enemyController';
import { BreadthFirstPathFind } from './logic/Pathfind';
import { GridUi } from './ui/gridUI';
import { ICellContent, ContentType, Direction } from "./interfaces/interfaces";

export class Game {
    private player: ICellContent;
    private enemy: ICellContent;
    private gridUi;
    private grid;
    private game;
    private pathFind;
    private upKey;
    private downKey;
    private leftKey;
    private rigthKey;
    private enemyManager;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.grid = new Grid(GridData);
        this.gridUi = new GridUi(game, this.grid);

        // TODO change how to initialize enemy controller
        this.grid.AddContentCreatedListener((content: ICellContent) => {
            if (content.Type === ContentType.Player) {
                this.player = content;
            } else if (content.Type === ContentType.Enemy) {
                this.enemy = content;
            } else if (this.enemy && this.player) {
                this.enemyManager = new EnemyController(this.grid, this.player, this.enemy);
            }
        });

        this.grid.CreateBoard();
        this.KeyboardInputs();
    }

    public KeyboardInputs(): void {
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKey.onDown.add(() => this.grid.Move(this.player, Direction.Up), this);

        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downKey.onDown.add(() => this.grid.Move(this.player, Direction.Down), this);

        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.leftKey.onDown.add(() => this.grid.Move(this.player, Direction.Left), this);

        this.rigthKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.rigthKey.onDown.add(() => this.grid.Move(this.player, Direction.Right), this);
    }

    public findPlayer(): void {
        this.enemyManager.FindPathToPlayer();
    }
}
