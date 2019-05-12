// Defining the number of stars
let numStars = 0;
// Defining the number of hearts
let hearts = 4;
// Set the starting level to 1
let level = 1;

// Defining an array of random X values in order to create enemies
const yValues = [60, 145, 230];
const yRandom = yValues[Math.floor(Math.random() * yValues.length)];
let enemySpeed = 150;

// Defining random locations where stars are generated
const yCollectibleValues = [42, 125, 208];
const xCollectibleValues = [0, 100, 200, 300, 400];
let yCollectible = yCollectibleValues[Math.floor(Math.random() * yCollectibleValues.length)];
let xCollectible = xCollectibleValues[Math.floor(Math.random() * xCollectibleValues.length)];



// geme over function heart=0
function gameOver() {
  // Hides body information
  let gameplayInfo = document.getElementById('the-game');
  let title = document.getElementById('title');
  let theCanvas = document.querySelector('canvas');
  let gameOver = document.getElementById('game-over');
  gameplayInfo.classList.add('hidden');
  title.classList.add('hidden');
  theCanvas.classList.add('hidden');
  // Shows the game over screen
  gameOver.classList.remove('hidden');
};

// congratulation function lelel =6
function Congratulations()
{
   // Hides body information
  let gameplayInfo = document.getElementById('the-game');
  let title = document.getElementById('title');
  let theCanvas = document.querySelector('canvas');
  let playagain = document.getElementById('congra');
  gameplayInfo.classList.add('hidden');
  title.classList.add('hidden');
  theCanvas.classList.add('hidden');
  // Shows the Congratulations screen
  playagain.classList.remove('hidden');
};
      
  

// Defining the Enemy class
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  };
  update(dt) {
    // Smoothens the moving animation
    this.x += this.speed * dt;
    // Loops the enemy entity from right to left
    if (this.x >= 500) {
      this.x = -120;
    }
  };
  render() {
    // Draws the enemy on the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  // Collision detection
  checkCollision() {
    
    if (this.x < player.x + 50 &&
      this.x + 49 > player.x &&
      this.y < player.y + 49 &&
      49 + this.y > player.y) {
      // Returns player to the starting point
      player.x = 200;
      player.y = 400;
      // Decreases the players lives
      hearts -= 1;
    };

    // Defines the 3 hearts that displayed on the screen
    let heart1 = document.getElementById('heart1');
    let heart2 = document.getElementById('heart2');
    let heart3 = document.getElementById('heart3');
    // Changes the icon of lives according to losing lives
    if (hearts === 3) {
      heart3.classList.remove('fa-heart');
      heart3.classList.add('fa-heart-o');
    } else if (hearts === 2) {
      heart2.classList.remove('fa-heart');
      heart2.classList.add('fa-heart-o');
    } else if (hearts === 1) {
      // Runs the gameOver function if heart=0
      gameOver();
    }
  }
};

// Defining the player class
class Player extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/char-pink-girl.png';
  };

  update() {
    // Prevent walking out canvas
    if (this.y >= 400) {
      this.y = 400;
    }
    if (this.x >= 400) {
      this.x = 400;
    }
    if (this.x <= 0) {
      this.x = 0;
    };

    //reset position if player Reach water
    if (this.y <= 0) {
      this.x = 200;
      this.y = 400;
      // increaseLevel 
      increaseLevel();
    };
  };

  // Handles the keyboard inputs
  handleInput(input) {
    if (input == 'left') {
      this.x -= 101;
    }
    if (input == 'up') {
      this.y -= 83;
    }
    if (input == 'right') {
      this.x += 101;
    }
    if (input == 'down') {
      this.y += 83;
    }
  };

  render() {
    // Draws  the player on the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

};

// Defines the stars
class Stars {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/star.png';
  };
  render() {
    // Draws  the stars on the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  collect() {
    if (this.x < player.x + 50 &&
      this.x + 49 > player.x &&
      this.y < player.y + 49 &&
      49 + this.y > player.y) {
      //player take star increase star
      numStars++;
      // Shows the number of stars 
      document.getElementById("stars").innerHTML = numStars;
      // Remove the current star
      allStars.splice(0,1);
    }
  }
};



function increaseLevel() {
  // Increases the level 
  level++;
  document.getElementById("level").innerHTML = level;
  // Removes enemies to prevent too many enemies being present
  if (allEnemies.length > 8 && level<6 ) {
    allEnemies.shift();
  }; 

  if (level===6 ){
    Congratulations();
  };

  // Creates more enemies to increase difficulty of level
  enemySpeed += 30;
  const yRandom = yValues[Math.floor(Math.random() * yValues.length)];
  for (let i = 0; i <= level; i++) {
    let enemy = new Enemy(-120, yRandom, enemySpeed);
    allEnemies.push(enemy);
  };

  // Add new star 
  if (allStars.length <= 0) {
    let yCollectible = yCollectibleValues[Math.floor(Math.random() * yCollectibleValues.length)];
    let xCollectible = xCollectibleValues[Math.floor(Math.random() * xCollectibleValues.length)];
    let stars = new Stars(xCollectible, yCollectible);
    allStars.push(stars);
  }
};

// Creating the stars array
let allStars = [];
// Creating the enmies array
let allEnemies = [];
// Creates the stars
let stars = new Stars(xCollectible, yCollectible);
allStars.push(stars);
// Creates the first enemy
let enemy1 = new Enemy(-220, yRandom,enemySpeed);
allEnemies.push(enemy1);
// Creates the second enemy
let enemy2 = new Enemy(100, yRandom,enemySpeed);
allEnemies.push(enemy2);
// Generates the player
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});