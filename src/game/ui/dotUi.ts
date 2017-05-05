import { Enemy } from "../logic/grid";
import * as Assets from '../../assets';
import { ICell } from "../interfaces/interfaces";

export class DotUi {
    private sprite: Phaser.Sprite = null;

    constructor(game: Phaser.Game, dotUi: dotUi) {
      this.game = game;
      this.dotUi = dotUi;

      console.log('DotUi is created');
      this.Show();
    }

    private Show() :void {
      console.log('display ui ');
      this.sprite = this.game.add.sprite(this.dotUi.Cell.x * 32, this.dotUi.Cell.y * 32, Assets.Images.dotUi.getName());
      this.sprit.scale.setTo(0.050, 0.050);
    }
  }
