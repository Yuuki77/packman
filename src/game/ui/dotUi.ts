import * as Assets from '../../assets';
import { ICell, ICellContent } from "../interfaces/interfaces";
import { Dot } from "../logic/contents/dot";

export class DotUi {
  private game: Phaser.Game;
  private sprite: Phaser.Sprite = null;
  private dot: ICellContent;
  private player: ICellContent;
  private enemy: ICellContent;

  constructor(game: Phaser.Game, dot: Dot) {
    this.game = game;
    this.dot = dot;
    this.Show();
    this.dot.AddVistLietenr(() => this.Hide());
  }

  private Show(): void {
    this.sprite = this.game.add.sprite(this.dot.Cell.x * 18 + 9, this.dot.Cell.y * 18 + 9, Assets.Images.ImagesYellowDot.getName());
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(0.050, 0.050);
    this.sprite.z = 1;
  }

  private Hide(): void {
    console.log("hide is called");
    this.sprite.visible = false;
  }
}
