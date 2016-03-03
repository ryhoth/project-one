window.onload = function() {
  console.log("JS loaded");
    genDivs(3);
}


// var draw = function (grid){
  // var board = document.getElementById('board');
//   for(var rw = 0; rw < grid; rw++){                       // rw is for rows
//       var row = document.createElement("div");
//       row.className = "row";
//       for(var cl = 1; cl <= grid; cl++){                // cl is for columns
//           var cell = document.createElement("div");
//           for(var part = 0 ; part < this.parts.length; )
//             if ((this.parts[part][0] === rw ) && ( this.parts[part][1] === cl )) {
//               cell.classList.add("snake");
//             }
//           row.appendChild(cell);
//       }
//       board.appendChild(row);
//   }
// }


function genDivs(v){
  var board = document.getElementById('board');
  for(var i = 0; i < v; i++){
    var row = document.createElement("div");
    row.className = "row";
    for(var x = 1; x <= v; x++){
        var cell = document.createElement("div");
        cell.className = "gridsquare";
        cell.innerText = (i * v) + x;
        row.appendChild(cell);
    }
    board.appendChild(row);
  }
  document.getElementById("gridsquare").innerText = board.innerHTML;
}
