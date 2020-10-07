import {score} from './createStars';
export let cursors, scoreText;
export const createCursorAndText = (src) => {
  cursors = src.input.keyboard.createCursorKeys();

  scoreText = src.add.text(
    16,
    16,
    `Score: ${score}`,
    {fontSize: '32px', fill: '#fff'}
  )
}
