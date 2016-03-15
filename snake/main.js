window.onload = function() {
  console.log("JS loaded");
  snake.play();
};


//bugs:
// 1. I need a to grow snake upon approach. CHECK
// 2. I need to fix the go horizontal grow bug where both grow and move work. CHECK
// 3. I need to put walls and die when I hit them and hit self (snake) CHECK --
// 4. I need a die function CHECK
// 4. I need to make the apple disappear when I eat it. CHECK

var snake = {
  startButton: startButton = document.getElementById('start'),
  message: message = document.getElementById('message'),
  scor: scor = document.getElementById('score'),
  play: function(){
    startButton.addEventListener('click' , function(){
    window.location.reload();
    }),
    snake.activateKeys();
    snake.draw();
    snake.action();
    snake.appleRando();
  },
  game: true,
  size: 20,
  time: 100,
  score: 0,
  parts : [ // a part is a [row, col] combo
    [4, 2], // tail
    [5, 2],
    [6, 2],
    [7, 2], // head
  ],
  appleRando: function () { //random apples to pop up in coordinates that differ from parts
    setInterval( function(){
    var x = ~~(Math.random()* snake.size);
    var y = ~~(Math.random()* snake.size);
    for(var part = 0 ; part < snake.parts.length; part++ ){
      if ((snake.parts[part][0] === x ) && ( snake.parts[part][1] === y )) {
        snake.appleRando();
      } else {
        snake.apple[0] = x;
        snake.apple[1] = y;
      }
      board.innerHTML= "";
      snake.draw();
    }
  }, snake.appleTime)},

  applePoofScore: function(){
    snake.apple[0]= -100;
    snake.apple[1]= -100;
    snake.score += 1;
    snake.time -= 10;
    console.log(snake.time);
    scor.innerHTML= "Score: "+snake.score;
    this.message.innerHTML = "GULP!";
    setTimeout( function(){
      this.message.innerHTML = "Apples.... Yumm....";}, 1000);
    console.log(snake.score);
  },
  appleTime: 4000,
  apple: [10, 10],
  direction: [[0, 1], // direction is a [row, col] "vector" >> DOWN
              [0,-1], // >> UP
              [1,0], // >> RIGHT
              [-1,0]], // >> LEFT
  orientation: "",

  action:  function() {
    if(snake.game){
        act = setInterval( function(){
        if (snake.orientation =="right") {
            snake.goRight();
        } else if (snake.orientation === "left") {
              snake.goLeft();
        } else if (snake.orientation === "up") {
              snake.goUp();
        } else if (snake.orientation === "down") {
              snake.goDown();
        }
      }, snake.time);
    }
  },

  act: act = null,

  die: function(){
    // snake.game = false;
    clearInterval(act);
    this.message.innerHTML = "Game Over! Press Play again.";
  },

  board: board = document.getElementById('board'),

  draw: function (){
    for(var rw = 0; rw < this.size; rw++){                       // rw is for rows
        var row = document.createElement("div");
        row.className = "blocks";
        for(var cl = 0; cl < this.size; cl++){                // cl is for columns
            var cell = document.createElement("div");
            for(var part = 0 ; part < this.parts.length; part++ ){
              if ((this.parts[part][0] === rw ) && ( this.parts[part][1] === cl )) {
                cell.classList.add("snake");
              } else if ((snake.parts[snake.parts.length - 1][0] === rw ) && ( snake.parts[snake.parts.length - 1][1] === cl )) {
                cell.classList.add("head");
              } else if ( (this.apple[0] === rw) && (this.apple[1] == cl) ) {
                cell.classList.add("apple");
              } else {
                cell.classList.add("field");
              }
            }
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
  },

  activateKeys: function () {
      document.onkeydown = function(e) {
        // if (snake.game) {
          switch (e.keyCode) {
              case 37:
              if ((snake.orientation !== "left")&&( snake.orientation !== "right")) {
                  snake.goLeft();
                  break;
                } else {
                  break;
                }
              case 38:
              if ((snake.orientation !== "up")&&( snake.orientation !== "down")){
                  snake.goUp();
                  break;
                } else {
                  break;
                }
              case 39:
              if ((snake.orientation !== "left")&&( snake.orientation !== "right")) {
                  snake.goRight();
                  break;
                } else {
                  break;
                }
              case 40:
              if ((snake.orientation !== "up")&&( snake.orientation !== "down")){
                  snake.goDown();
                  break;
                } else {
                  break;
                }
          }
        // }
      };
  },

  checkDeath: function() {
    if( (snake.parts[snake.parts.length - 1][0] > snake.size-1) ||
        (snake.parts[snake.parts.length - 1][0] < 0) ||
        (snake.parts[snake.parts.length - 1][1] > snake.size-1 ) ||
        (snake.parts[snake.parts.length - 1][1] < 0 ) ) {
        snake.die();
      console.log("FUCK YOU DEAD!");
    }
    for(var part = 0 ; part < snake.parts.length -1; part++ ){
      if ( (snake.parts[snake.parts.length - 1][0] === snake.parts[part][0] ) &&
      (  snake.parts[snake.parts.length - 1][1] === snake.parts[part][1] )) {
        snake.die();
        console.log("YOU FUCKING YO SELF!");
      }
    }
  },
  moveR: function () {
    // remove the "tail"
    this.parts.shift();                                             //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[2][0], //head RIGHT X
        this.parts[this.parts.length - 1][1] + this.direction[2][1]] //head RIGHT Y
    );
    board.innerHTML= "";
    this.draw();
  },
  growR: function () {  // add a "head" in the current direction
    console.log("grew RIGHT");
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[2][0], //head RIGHT X
        this.parts[this.parts.length - 1][1] + this.direction[2][1]] //head RIGHT Y
    );
    board.innerHTML= "";
    snake.applePoofScore();
    this.draw();
  },
  moveL: function () {
    // remove the "tail"
    this.parts.shift();                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[3][0], //head LEFT X
        this.parts[this.parts.length - 1][1] + this.direction[3][1]] //head LEFT Y
    );
    board.innerHTML= "";
    this.draw();
  },
  growL: function () {  // add a "head" in the current direction
      console.log("grew LEFT");
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[3][0], //head LEFT X
        this.parts[this.parts.length - 1][1] + this.direction[3][1]] //head LEFT Y
    );
    board.innerHTML= "";
    snake.applePoofScore();
    this.draw();
  },
  moveU: function () {
    // remove the "tail"
    this.parts.shift();                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[1][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[1][1]] //head UP Y
    );
    board.innerHTML= "";
    this.draw();
  },
  growU: function () {  // add a "head" in the current direction
          console.log("grew UP");
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[1][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[1][1]] //head UP Y
    );
    board.innerHTML= "";
    snake.applePoofScore();
    this.draw();
  },
  moveD: function () {
    // remove the "tail"
    this.parts.shift();                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[0][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[0][1]] //head UP Y
    );
    board.innerHTML= "";
    this.draw();
  },
  growD: function () {  // add a "head" in the current direction
          console.log("grew DOWN");
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[0][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[0][1]] //head UP Y
    );
    board.innerHTML= "";
    snake.applePoofScore();
    this.draw();
  },
  goRight: function (){
    snake.checkDeath();
    if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[2][0]) === snake.apple[0]) &&
        ((snake.parts[snake.parts.length - 1][1] + snake.direction[2][1]) === snake.apple[1]) ){
          // for (var i = 0; i < 2; i++) {
            snake.growR();
          // }
      snake.orientation = "right"; //yooo
    } else {
        snake.moveR();
      snake.orientation = "right";
      snake.checkDeath();
    }
  },
  goLeft: function (){
    snake.checkDeath();
    if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[3][0] ) === snake.apple[0]) &&
        ((snake.parts[snake.parts.length - 1][1] + snake.direction[3][1]) === snake.apple[1]) ){
          // for (var i = 0; i < 2; i++) {
            snake.growL();
        // }
          snake.orientation = "left"; //yooo
    } else {
        snake.moveL();
      snake.orientation = "left";
      snake.checkDeath();
    }
  },
  goUp: function (){
    snake.checkDeath();
    if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[1][0] ) === snake.apple[0]) &&
        ((snake.parts[snake.parts.length - 1][1] + snake.direction[1][1]) === snake.apple[1]) ){
          // for (var i = 0; i < 2; i++) {
          snake.growU();
        // }
          snake.orientation = "up"; //yooo
    } else {
        snake.moveU();
      snake.orientation = "up";
      snake.checkDeath();
    }
  },
  goDown: function (){
    snake.checkDeath();
    if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[0][0] ) === snake.apple[0]) &&
        ((snake.parts[snake.parts.length - 1][1] + snake.direction[0][1]) === snake.apple[1]) ){
        // for (var i = 0; i < 2; i++) {
          snake.growD();
        // }
          snake.orientation = "down"; //yooo
    } else {
        snake.moveD();
      snake.orientation = "down";
      snake.checkDeath();
    }
  }
};
