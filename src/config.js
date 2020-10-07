import Phaser from 'phaser';
import GameScene from './gameScene';

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: GameScene,
  "scale": {
    "mode": 0,
    "autoCenter": 2
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: true
    }
  },
};
