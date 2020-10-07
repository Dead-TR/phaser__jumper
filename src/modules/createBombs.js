import {platforms} from './createPlatforms';
import {player} from './createPlayer';

export let gameOver,  bombs;

export const createBombs = (src) => {
  bombs = src.physics.add.group();
  src.physics.add.collider(bombs, platforms);
  src.physics.add.collider(player, bombs, hitBomb, null, src);
}

function hitBomb (player) {
  player.setTint(0xff0000);
  this.physics.pause();
  player.anims.play('turn');
  gameOver = true;
}
