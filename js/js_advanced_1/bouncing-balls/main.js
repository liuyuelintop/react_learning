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

         this.x += this.velX
         this.y += this.velY;
      };

      this.collisionDetect = function () {
         // change to random color when bouncing balls collisions occur
         for (const [index, ball] of balls.entries()) {
            if (!(this === ball)) {
               const dx = this.x - ball.x;
               const dy = this.y - ball.y;
               const distance = Math.sqrt(dx * dx + dy * dy);
               if (distance < this.size + ball.size) {
                  if(this.name === "BlackHole"){
                     console.log("Index of the ball is ", index);
                     balls.splice(index,1);
                     const h1 = document.querySelector("h1");
                     h1.innerHTML = "Bouncing balls left " + (balls.length-1);
                     console.log(h1);
                     console.log("balls left " + balls.length);
                  }
                  else{
                     ball.color = this.color = randomRGB();
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
// generate bouncing balls
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

function BlackHole(x, y, velX, velY, size, exists){
   Shape.call(this, x, y, velX, velY, exists);
   this.name = "BlackHole";
   this.size = size;

   this.prototype.draw = function(){
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
      // ctx.beginPath();
      // ctx.fillStyle = 'rgba(255,255,255,0.9)';
      // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      // ctx.fill();
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.fillStyle = 'rgba(0,0,0,1)';
      // ctx.arc(this.x, this.y, 0.85*this.size, 0, 2 * Math.PI);
      // ctx.fill();
      // ctx.stroke();

   };

   this.prototype.update = function () {
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

   this.prototype.collisionDetect = function () {
      // change to random color when bouncing balls collisions occur
      for (const [index, ball] of balls.entries()) {
         if (!(this === ball)) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + ball.size) {
               if(this.name === "BlackHole"){
                  console.log("Index of the ball is ", index);
                  balls.splice(index,1);
                  const h1 = document.querySelector("h1");
                  h1.innerHTML = "Bouncing balls left " + (balls.length-1);
                  console.log(h1);
                  console.log("Bouncing balls left " + (balls.length-1));
               }
               else{
                  ball.color = this.color = randomRGB();
               } 
            }
         }
      }
   };

   this.prototype.checkBounds = function () {
      if (this.x + this.size >= width) {
         this.x -= this.size;
      }
      
      if (this.x - this.size <= 0) {
         this.x += this.size;
      }
      
      if (this.y + this.size >= height) {
         this.y -= this.size;
      }
      
      if (this.y - this.size <= 0) {
         this.y += this.size;
      }
      
   };

   this.prototype.setControl = function(){
      document.addEventListener("keydown", function(e){
         var key = e.key;
         var r = 0.5;
         var stride = r*blackhole.size;
         switch(key){
            case "w":
            case "W":
            case "ArrowUp":
               blackhole.y-stride<=blackhole.size?blackhole.y=blackhole.size:blackhole.y -= stride;
               break;
            case "s":
            case "S":
            case "ArrowDown":
               blackhole.y+stride>=height-blackhole.size?blackhole.y=height-blackhole.size:blackhole.y += stride;
               break;
            case "a":
            case "A":
            case "ArrowLeft":
               blackhole.x-stride<=blackhole.size?blackhole.size:blackhole.x -= stride;
               break;
            case "d":
            case "D":
            case "ArrowRight":
               blackhole.x+stride>=width-blackhole.size?blackhole.x=width-blackhole.size:blackhole.x += stride;
               break;
            case "Control":
               console.log(balls);
               break;
         };
         console.log(e.key);
      },false);
   };
}
BlackHole.prototype = BlackHole;
BlackHole.prototype.__proto__ = Shape.prototype;
const blackhole = new BlackHole(random(0,width),random(0,height), 10, 10, 50, true);
balls.push(blackhole);

blackhole.setControl();
function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
   }
   
   // blackhole.checkBounds();
   blackhole.draw();
   blackhole.update();
   requestAnimationFrame(loop);
}

loop();
