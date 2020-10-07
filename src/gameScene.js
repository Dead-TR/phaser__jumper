import Phaser, { Scene } from 'phaser';

import { createPlatforms, platforms} from './modules/createPlatforms';
import { createPlayer, player} from './modules/createPlayer';
import { createCursorAndText, cursors} from './modules/createCursorAndText';
import { createStars} from './modules/createStars';
import { createBombs} from './modules/createBombs';
import { keyer} from './modules/keyer';
import { createBombs} from './modules/createBombs';

export default class GameScene extends Scene {
  preload (){
    this.load.image('sky', 'assets/assets/sky.png');
    this.load.image('star', 'assets/assets/star.png');
    this.load.image('ground', 'assets/assets/platform.png');
    this.load.image('bomb', 'assets/assets/bomb.png');
    this.load.spritesheet(
      'dude',
      'assets/assets/dude.png',
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );
  }

  create (){
    this.add.image(400, 300, 'star')
    .setOrigin(0.5, 0.5);

    this.add.image(0, 0, 'sky')
    .setOrigin(0, 0);

    createPlatforms(this);
    createPlayer(this);
    createCursorAndText(this);
    createStars(this);
    createBombs(this);
  }

  update() {
    keyer();
  }
}
