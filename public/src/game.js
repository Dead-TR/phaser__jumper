const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: true
    }
  },
  scene: { // як я розумію: порядок виконання функцій
      preload: preload,
      create: create,
      update: update
  }
};

let platforms, player, cursors, stars, scoreText, gameOver;

let score = 0;

const game = new Phaser.Game(config);

function collectStar (player, star) { // зіткнення ГГ і зірки
  star.disableBody(true, true); // видалити об'єкт star
  scoreText.setText(`Score: ${++score}`);
   // console.log("collectStar -> this.physics;", this.physics.pause()) // поставити гру на паузу
   // console.log("collectStar -> this.physics;", this.physics.resume()) // продовжити гру

  if (stars.countActive(true) === 0) { // stars - група елементів. countActive - метод групи, котрий вказує їхню кількість
    stars.children.iterate(child => {//children - масив усіх елементів групи
      child.enableBody(true, child.x, 0, true, true); // enableBody - повертає об'єкт у симуляцію після його видалення вище
    });
    const x = (player.x < 400) // перевірка координати гравця
      ? Phaser.Math.Between(400, 800) //якщо ГГ по лівий бік сцени, х отримує значення праворуч
      : Phaser.Math.Between(0, 400); // якщо ГГ по правий -- ліворуч

    const bomb = bombs.create(x, 16, 'bomb'); //створити об'єкт bomb в позиції x
    bomb.setBounce(1); //відпружинювання бомб
    bomb.setCollideWorldBounds(true); //відпружинювання від рамок сцени
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); // швидкість тіла
  }
}

function hitBomb (player, bomb) { // зіткнення ГГ і бомби
  player.setTint(0xff0000); // забарвлює зображення у червоний колір (накладає фільтр)
        //clearTint - знімає фільтр
  this.physics.pause();
  player.anims.play('turn'); // запустити відповідну анімацію
  gameOver = true;
}

// this === game.scene.scenes[0]

function preload (){
  this.load.image('sky', './assets/sky.png');
  this.load.image('star', './assets/star.png');
  this.load.image('ground', './assets/platform.png');
  this.load.image('bomb', './assets/bomb.png');
  this.load.spritesheet( //Завантаження спрайт-сету
    'dude',
    './assets/dude.png',
    {
      frameWidth: 32, // довжина й висота одного кадру
      frameHeight: 48,
    }
  );
}

function create (){
  this.add.image(400, 300, 'star')
  .setOrigin(0.5, 0.5); // зірка хоч і знаходиться по центу екрану -- залишається невидимою, т.я. перекривається небом
          // викликати зображення потрібно в порядку глибини

  this.add.image(0, 0, 'sky') // закріпити у верхньому лівому кутку
  .setOrigin(0, 0); // з якорем 0, 0

  platforms = this.physics.add.staticGroup(); // закріпити за platforms статичну фізику

  platforms.create(400, 568, 'ground')
    .setScale(2)// скейл об'єкта
     .refreshBody(); // оновлює параметри фізичної моделі, відповідно, до нових розмірів
  platforms.create(600, 400, 'ground'); // create створює елемент у вказаних координатах, за зразком
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');
      // надати динамічну фізику об'єкту player,
        //розмістити у вказаних координатах,
        // і закріпити за ним спрайт 'dude'

  player.setBounce(0.2); // сила відскоку
  player.setCollideWorldBounds(true);
  player.body.setGravityY(100) // вага елемента

  this.anims.create({
    key: 'left',  // ім'я анімації
    frames: this.anims.generateFrameNumbers( // розбити тайл анімації, на кадри
      'dude', // джерело тайлу, котрий буде розбиватися. Розміри кадру вказані при його виклику.
      {
        start: 0, // перший кадр
        end: 3, // останній кадр
      }
    ),
    frameRate: 10, // **час виконання?
    repeat: -1, // повторювати нескінченно
  });

  this.anims.create({
    key: 'turn',
    frames: [{
      key: 'dude',
      frame: 4
    }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers(
      'dude',
      {
        start: 5,
        end: 8,
      }
    ),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms); // collider перевіряє зіткнення об'єктів, і стопоприть динамічні

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({ // створення групи з фізикою
    key: 'star', // зображення для елементів групи
    repeat: 11, // повторити 11-ть разів
    setXY: {x: 12, y: 0, stepX: 70} // позиціонування кожного з елементів
  })    //  перша координата по х,
        //  перша координата по y,
        //  крок по х

  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
    // встановити рандомний setBounceY в діапазоні від 0,1 до 0,4
  })

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
    // overlap - це слухач. Означає, що коли буде здійснено перетин
      // player і stars, запуститься collectStar(player, stars)

  scoreText = this.add.text(
    16, //позиція текстового об'єкту
    16, //позиція текстового об'єкту
    `Score: ${score}`, // власне текст
    {fontSize: '32px', fill: '#fff'} // стилі тексту
  )

  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);

}

function update() {

  if (cursors.left.isDown) {  // перевірка натиснення кнопки
    player.setVelocityX(-160); // setVelocityX - "потягнути" героя на -160 пікселів по координаті X
    player.anims.play('left', true); //запустити "ліву" анімацію
  }

  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }

  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  };

  if (cursors.up.isDown && player.body.touching.down) { // перевірити кнопку up, i чи доторкається ГГ до опори
    player.setVelocityY(-400);
  };
}
