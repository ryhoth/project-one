window.onload = function() {
  console.log("JS loaded");
  activateKeys();
  snake.draw();
  snake.action();
  snake.appleRando();
}
// I need a to grow snake upon approach.
// I need to fix the go horizontal grow bug where both grow and move work.
// I need to put walls and die when I hit them and hit self (snake) -- perhaps a die function
// I need to make the apple disappear when I eat it.
var board = document.getElementById('board');
var activateKeys = function () {
  document.onkeydown = function(e) {
      switch (e.keyCode) {
          case 37:
              goLeft();
              break;
          case 38:
              goUp();
              break;
          case 39:
              goRight();
              break;
          case 40:
              goDown();
              break;
      }
    }
}
var goRight = function (){
  if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[2][0]) === snake.apple[0]) &&
      ((snake.parts[snake.parts.length - 1][1] + snake.direction[2][1]) === snake.apple[1]) ){
      snake.growR();
    snake.orientation = "right";
  } else if ((snake.orientation !== "left")&&( snake.orientation !== "right")) {
      snake.moveR()
    snake.orientation = "right";
  }
}
var goLeft = function (){
  if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[3][0] ) === snake.apple[0]) &&
      ((snake.parts[snake.parts.length - 1][1] + snake.direction[3][1]) === snake.apple[1]) ){
        snake.growL();
  } else if ((snake.orientation !== "left")&&( snake.orientation !== "right") ) {
      snake.moveL()
    snake.orientation = "left";
  }
}
var goUp = function (){
  if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[1][0] ) === snake.apple[0]) &&
      ((snake.parts[snake.parts.length - 1][1] + snake.direction[1][1]) === snake.apple[1]) ){
        snake.growU();
  } else if ((snake.orientation !== "up")&&( snake.orientation !== "down")){
      snake.moveU()
    snake.orientation = "up";
  }
}
var goDown = function (){
  if( (( snake.parts[snake.parts.length - 1][0] + snake.direction[0][0] ) === snake.apple[0]) &&
      ((snake.parts[snake.parts.length - 1][1] + snake.direction[0][1]) === snake.apple[1]) ){
        snake.growD();
  } else if ((snake.orientation !== "up")&&( snake.orientation !== "down")) {
      snake.moveD()
    snake.orientation = "down";
  }
}

var snake = {
  size: 40,
  time: 100,
  parts : [ // a part is a [row, col] combo
    [0, 0], // tail
    [0, 1],
    [0, 2], // head
  ],
  appleRando: function () { //random apples to pop up in coordinates that differ from parts
    setInterval( function(){
    var x = ~~(Math.random()* snake.size);
    var y = ~~(Math.random()* snake.size);
    for(var part = 0 ; part < snake.parts.length; part++ ){
      if ((snake.parts[part][0] !== x ) && ( snake.parts[part][1] !== y )) {
        snake.apple[0] = x;
        snake.apple[1] = y;
      }
      board.innerHTML= "";
      snake.draw();
    }
  } , 4000)},
  apple: [10, 10],
  direction: [[0, 1], // direction is a [row, col] "vector" >> DOWN
              [0,-1], // >> UP
              [1,0], // >> RIGHT
              [-1,0]], // >> LEFT
  orientation: "",
  action:  function() {
    setInterval( function(){
    if (snake.orientation =="right") {
        snake.moveR()
    } else if (snake.orientation === "left") {
          snake.moveL()
    } else if (snake.orientation === "up") {
          snake.moveU()
    } else if (snake.orientation === "down") {
          snake.moveD()
    }
  } , snake.time)},
  draw: function (){
    for(var rw = 0; rw < this.size; rw++){                       // rw is for rows
        var row = document.createElement("div");
        row.className = "blocks";
        for(var cl = 0; cl < this.size; cl++){                // cl is for columns
            var cell = document.createElement("div");
            for(var part = 0 ; part < this.parts.length; part++ ){
              if ((this.parts[part][0] === rw ) && ( this.parts[part][1] === cl )) {
                cell.classList.add("snake");
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
  moveR: function () {
    // remove the "tail"
    this.parts.shift()                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[2][0], //head RIGHT X
        this.parts[this.parts.length - 1][1] + this.direction[2][1]] //head RIGHT Y
    )
    board.innerHTML= "";
    this.draw();
  },
  growR: function () {  // add a "head" in the current direction
    console.log("WORKING");
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[2][0], //head RIGHT X
        this.parts[this.parts.length - 1][1] + this.direction[2][1]] //head RIGHT Y
    )
    board.innerHTML= "";
    this.draw();
  },
  moveL: function () {
    // remove the "tail"
    this.parts.shift();                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[3][0], //head LEFT X
        this.parts[this.parts.length - 1][1] + this.direction[3][1]] //head LEFT Y
    )
    board.innerHTML= "";
    this.draw();
  },
  growL: function () {  // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[3][0], //head LEFT X
        this.parts[this.parts.length - 1][1] + this.direction[3][1]] //head LEFT Y
    )
    board.innerHTML= "";
    this.draw();
  },
  moveU: function () {
    // remove the "tail"
    this.parts.shift();                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[1][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[1][1]] //head UP Y
    )
    board.innerHTML= "";
    this.draw();
  },
  growU: function () {  // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[1][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[1][1]] //head UP Y
    )
    board.innerHTML= "";
    this.draw();
  },
  moveD: function () {
    // remove the "tail"
    this.parts.shift();                                              //just going to remove the last
    // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[0][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[0][1]] //head UP Y
    )
    board.innerHTML= "";
    this.draw();
  },
  growD: function () {  // add a "head" in the current direction
    this.parts.push(
      [ this.parts[this.parts.length - 1][0] + this.direction[0][0], //head UP X
        this.parts[this.parts.length - 1][1] + this.direction[0][1]] //head UP Y
    )
    board.innerHTML= "";
    this.draw();
  }
}
//    loop over parts, and update the dom

// var bloc;
//  // height: 60vw; width: 90vw;
// var draw = function() {
//   for(var block =0; block < tiny.length; block ++ ){
//     bloc = document.createElement('div');
//     bloc.className = "blocks";
//     if (tiny[block] === 0 ) {
//       bloc.classList.add('field');
//     } else if (tiny[block] === 1) {
//       bloc.classList.add('snake');
//     } else if (tiny[block] === 2 ) {
//       bloc.classList.add('head');
//     } else if (tiny[block] === 3 ) {
//       bloc.classList.add('apple');
//     }
//     board.appendChild(bloc);
//   }
// };

// var viewBlocks = function() {
//   for(var block =0; block < tiny.length; block ++ ){
//     var arrayOfBlocks = document.getElementsByClassName('blocks');
//     for(var i=0; i < arrayOfBlocks.length; i++){
//       var el = arrayOfBlocks[i];
//       if (tiny[block] === 0 ) {
//         el.classList.add('field');
//         if(el.classList.contains('snake')){
//           el.classList.remove('snake')
//           break;
//         }
//         if(el.classList.contains('head')){
//           el.classList.remove('head')
//           break;
//         }
//         if(el.classList.contains('apple')){
//           el.classList.remove('apple')
//           break;
//         }
//       } else if (tiny[block] === 1) {
//         el.classList.add('snake');
//         if(el.classList.contains('field')){
//           el.classList.remove('field')
//           break;
//         }
//         if(el.classList.contains('head')){
//           el.classList.remove('head')
//           break;
//         }
//         if(el.classList.contains('apple')){
//           el.classList.remove('apple')
//           break;
//         }
//       } else if (tiny[block] === 2 ) {
//         el.classList.add('head');
//         if(el.classList.contains('field')){
//           el.classList.remove('field')
//           break;
//         }
//         if(el.classList.contains('snake')){
//           el.classList.remove('snake')
//           break;
//         }
//         if(el.classList.contains('apple')){
//           el.classList.remove('apple')
//           break;
//         }
//       } else if (tiny[block] === 3 ) {
//         el.classList.add('apple');
//         if(el.classList.contains('field')){
//           el.classList.remove('field')
//           break;
//         }
//         if(el.classList.contains('snake')){
//           el.classList.remove('snake')
//           break;
//         }
//         if(el.classList.contains('head')){
//           el.classList.remove('head')
//           break;
//         }
//       }
//     }
//     break;
//   }
// };

//
// var growByOneBlock = function (){
//   console.log("growByOneBlock is running")
//   for (var current = 0; current < tiny.length; current++) {
//     console.log( tiny[current]);
//     if ( (tiny[current] === 2) && ( tiny[current+1] === 0)  ) {
//       tiny[current+1] = 2;
//       tiny[current] = 1;
//       console.log(tiny);
//       viewBlocks();
//       break;
//     }
//   }
// }

// var frameBlocks = function() {
//   for(var block =0; block < tiny.length; block ++ ){
//     bloc = document.getElementsByClassName('blocks');
//     if (tiny[block] === 0 ) {
//       bloc.classList.add('field');
//     } else if (tiny[block] === 1) {
//       bloc.classList.add('snake');
//     } else if (tiny[block] === 2 ) {
//       bloc.classList.add('head');
//     } else if (tiny[block] === 3 ) {
//       bloc.classList.add('apple');
//     }
//     board.appendChild(bod);
//   }
// };

// var left = 0;
// var top = 0;
// var direction = "right";
// var goRight = function() {
//   direction = "right";
//   setInterval( function(){       //this will make things move right on its own
//   if((left < 80) &&(direction === "right")){    // this will limit the bod from leaving the page
//     left = left + 4;
//     bod.style.left = left + "vw";
//   }} , 300)
//   }
