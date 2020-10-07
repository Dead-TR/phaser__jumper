export let platforms;
export const createPlatforms = (src) => {
  platforms = src.physics.add.staticGroup();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  platforms.create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();
}
