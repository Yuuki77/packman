import * as Assets from '../../assets';
import { ICell, ICellContent } from "../interfaces/interfaces";
import { Dot } from "../logic/contents/dot";

export class DotUi {
  private game: Phaser.Game;
  private sprite: Phaser.Sprite = null;
  private dot: ICellContent;
  private player: ICellContent;
  private enemy: ICellContent;

  constructor(game: Phaser.Game, dot: ICellContent) {
    this.game = game;
    this.dot = dot;
    this.Show();
    // this.dot.DotVisited((newCell: ICell) => this.Hide(newCell));
  }

  private Show(): void {
    this.sprite = this.game.add.sprite(this.dot.Cell.x * 18 + 9, this.dot.Cell.y * 18 + 9, Assets.Images.ImagesYellowDot.getName());
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(0.050, 0.050);
    this.sprite.z = 1;
  }

  private Hide(newCell: ICell): void {
    this.sprite.visible = false;
  }
}
