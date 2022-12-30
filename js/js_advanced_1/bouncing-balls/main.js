// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// class Shape
function Shape(x, y, velX, velY, exists){
   this.x = x;
   this.y = y;
   this.velX = velX;
   this.velY = velY;
   this.exists = exists;
}

Shape.prototype.getX = function(){
   console.log('x is ' + this.x);
}

// class Ball {

//    constructor(x, y, velX, velY, color, size) {
//       this.x = x;
//       this.y = y;
//       this.velX = velX;
//       this.velY = velY;
//       this.color = color;
//       this.size = size;
//    }

//    draw() {
//       ctx.beginPath();
//       ctx.fillStyle = this.color;
//       ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//       ctx.fill();
//    }

//    update() {
//       if ((this.x + this.size) >= width) {
//          this.velX = -(Math.abs(this.velX));
//       }

//       if ((this.x - this.size) <= 0) {
//          this.velX = Math.abs(this.velX);
//       }

//       if ((this.y + this.size) >= height) {
//          this.velY = -(Math.abs(this.velY));
//       }

//       if ((this.y - this.size) <= 0) {
//          this.velY = Math.abs(this.velY);
//       }

//       this.x += this.velX;
//       this.y += this.velY;
//    }

//    collisionDetect() {
//       for (const ball of balls) {
//          if (!(this === ball)) {
//             const dx = this.x - ball.x;
//             const dy = this.y - ball.y;
//             const distance = Math.sqrt(dx * dx + dy * dy);

//             if (distance < this.size + ball.size) {
//               ball.color = this.color = randomRGB();
//             }
//          }
//       }
//    }

// }

// function Ball
class Ball {
   constructor(x, y, velX, velY, exists, color, size) {
      // Shape.call(x, y, velX, velY, exists);
      this.name = "ball";
      this.x = x;
      this.y=y;
      this.velX = velX;
      this.velY = velY;
      this.exists = exists;
      this.color = color;
      this.size = size;
      this.draw = function () {
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
         ctx.fill();
      };

      this.update = function () {
         if ((this.x + this.size) >= width) {
            this.velX = -(Math.abs(this.velX));
         }

         if ((this.x - this.size) <= 0) {
            this.velX = Math.abs(this.velX);
         }

         if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY));
         }

         if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY);
         }

         this.x += this.velX;
         this.y += this.velY;
      };

      this.collisionDetect = function () {
         for (const [index, ball] of balls.entries()) {
            if (!(this === ball)) {
               const dx = this.x - ball.x;
               const dy = this.y - ball.y;
               const distance = Math.sqrt(dx * dx + dy * dy);
               if (distance < this.size + ball.size) {
                  ball.color = this.color = randomRGB();
                  if(this.name === "hole"){
                     console.log("Index of the ball is ", index);
                     balls.splice(index,1);
                     console.log("balls left" + balls.length);
                  }
                  
               }
            }
         }
      };
   }
}

Ball.prototype = Ball;
Ball.prototype.__proto__ = Shape.prototype;



const balls = [];

function BlackHole(x, y, velX, velY, exists){
   Shape.call(this, x, y, velX, velY, exists);

}
BlackHole.prototype = Object.create(Shape.prototype);
BlackHole.prototype.constructor = BlackHole;
const blackhole = new BlackHole(100, 100, 10, 10, true);

//test
const hole = new Ball(100,100,10,10,true,randomRGB(),100);
hole.name = "hole";


while (balls.length < 10) {
   const size = random(10,20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      true,
      randomRGB(),
      size
   );

  balls.push(ball);
}

balls.push(hole);

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) {
     ball.draw();
     ball.update();
     ball.collisionDetect();
   }

   requestAnimationFrame(loop);
}

loop();
