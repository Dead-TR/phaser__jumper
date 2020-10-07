import {platforms} from './createPlatforms';
import {player} from './createPlayer';
import {scoreText} from './createCursorAndText';
import {bombs} from './createBombs';

export let stars;
export let score = 0;

export const createStars = (src) => {
  stars = src.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: {x: 12, y: 0, stepX: 70}
  })

  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
  })

  src.physics.add.collider(stars, platforms);
  src.physics.add.overlap(player, stars, collectStar, null, src);
}

function collectStar (player, star) {
  star.disableBody(true, true);
  scoreText.setText(`Score: ${++score}`);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(child => {
      child.enableBody(true, child.x, 0, true, true);
    });
    const x = (player.x < 400)
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

    const bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
