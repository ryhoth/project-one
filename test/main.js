window.onload = function() {
  console.log("JS loaded");
  createBodyBlocks();
  activateKeys();
};
var bod;
var board = document.getElementById('board'); // height: 60vw; width: 90vw;
var createBodyBlocks = function() {
  bod = document.createElement('div');
  bod.classList.add('bod');
  board.appendChild(bod);
  };
var activateKeys = function () {
  document.onkeydown = function(e) {
      switch (e.keyCode) {
          case 37:
              // alert('left');
              goLeft();
              break;
          case 38:
              // alert('up');
              goUp();
              break;
          case 39:
              // alert('right');
              goRight();
              break;
          case 40:
              // alert('down');
              goDown();
              break;
      }
    };
};
var left = 0;
var top = 0;
var direction = "right";
var goRight = function() {
  direction = "right";
  setInterval( function(){       //this will make things move right on its own
  if((left < 80) &&(direction === "right")){    // this will limit the bod from leaving the page
    left = left + 4;
    bod.style.left = left + "vw";
  }} , 300);
};
var goLeft = function() {
  direction = "left";
  setInterval( function(){       //this will make things move left on its own
  if((left > 0) &&(direction === "left")){
    left = left - 4;
    bod.style.left = left + "vw";
  }}, 300);
};
// var goUp = function() {
//     direction = "up";
//     setInterval( function(){       //this will make things move left on its own
//     if((top > 0) &&(direction === "up")){
//       top = top + 1;
//       bod.style.top = top +"vw";
//         }}, 300)
// }
// var goDown = function() {
//     direction = "down";
//     setInterval( function(){
//     if((top > 0) &&(direction === "up")){
//       top = top - 1;
//       bod.style.top = 50 + "vw";
//         }}, 300)
// }

//   if (direction == "right") {
//     if (left <= board.width - 100) {
//         left += 10;
//     } else {
//       direction = "left";
//       bod.className = "left";
//     }
//   } else if (direction == "left") {
//     if (left >= 0) {
//         left -= 10;
//     } else {
//       direction = "right";
//       bod.className = "right";
//     }
//   }
//   console.log(left);
// }, 30);
