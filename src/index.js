import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
// import p2 from 'p2';
import Phaser from 'phaser';

import {config} from './config';

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
})

const game = new Phaser.Game(config);
