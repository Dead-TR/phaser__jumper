import {platforms} from './createPlatforms';

export let player;
export const createPlayer = (src) => {
  player = src.physics.add.sprite(100, 450, 'dude', 4);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(100);
  src.physics.add.collider(player, platforms);

  src.anims.create({
    key: 'left',
    frames: src.anims.generateFrameNumbers(
      'dude',
      {
        start: 0,
        end: 3,
      }
    ),
    frameRate: 10,
    repeat: -1,
  });

  src.anims.create({
    key: 'turn',
    frames: [{
      key: 'dude',
      frame: 4
    }],
    frameRate: 20,
  });

  src.anims.create({
    key: 'right',
    frames: src.anims.generateFrameNumbers(
      'dude',
      {
        start: 5,
        end: 8,
      }
    ),
    frameRate: 10,
    repeat: -1,
  });
}
