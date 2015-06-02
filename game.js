function setup() {
      var canvas = document.getElementById("canvas");
      var canv = canvas.getContext("2d");
	return canv
}

function drawGrid(row, col){
        ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect (10, 10, row*60 - 10, col*60 - 10);
        ctx.fillStyle = "rgb(255,255,255)";
	for (var y = 0; y < row; y++){
		for (var x = 0; x < col; x++){
			ctx.fillRect(10 + x*60, 10 + y*60, 50, 50); 
		}
	} 
}  
 
function drawX(row, col){
	xOff = 5 + ((col - 1) * 60);
	yOff = 5 + ((row - 1) * 60);
	var X = new Path2D();
	X.moveTo(10 + xOff, 10 + yOff);
	X.lineTo(20 + xOff, 10 + yOff);
	X.lineTo(30 + xOff, 25 + yOff);
	X.lineTo(40 + xOff, 10 + yOff);
	X.lineTo(50 + xOff, 10 + yOff);
	X.lineTo(35 + xOff, 30 + yOff);
	X.lineTo(50 + xOff, 50 + yOff);
	X.lineTo(40 + xOff, 50 + yOff);
	X.lineTo(30 + xOff, 35 + yOff);
	X.lineTo(20 + xOff, 50 + yOff);
	X.lineTo(10 + xOff, 50 + yOff);
	X.lineTo(25 + xOff, 30 + yOff);
	X.lineTo(10 + xOff, 10 + yOff);
	//X.arc(35 + ((col - 1) * 60), 35 + ((row - 1) * 60), 20, 0, 2 * Math.PI);
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fill(X);

}

function drawO(row, col){
	var O = new Path2D();
	O.moveTo(10, 10);
	O.arc(35 + ((col - 1) * 60), 35 + ((row - 1) * 60), 20, 0, 2 * Math.PI);
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fill(O);

	var Oin = new Path2D();
	Oin.moveTo(10, 10);	
	Oin.arc(35 + ((col - 1) * 60), 35 + ((row - 1) * 60), 12, 0, 2 * Math.PI);
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fill(Oin);
}

function move(mEvent){
	var row = Math.floor((mEvent.pageY + 30) / 50);
	var col = Math.floor((mEvent.pageX + 30) / 50);
	if (turn && board[row - 1][col - 1] === 0){
		drawO(row, col);
		board[row - 1][col - 1] = 1;
		turn--;
	}else if (!turn && board[row - 1][col - 1] === 0){
		drawX(Math.floor((mEvent.pageY + 30) / 50), Math.floor((mEvent.pageX + 30) / 50));
		board[row - 1][col - 1] = -1;
		turn++;
	}
	console.log(checkWin(board));	
	if (checkWin(board) === true){
		alert("Somebody won...");
	}else if (checkWin(board) === undefined){
		alert("Tie");
	}
}

IN_A_ROW_TO_WIN = 3
DIRECTIONS = [
    [0, 1],      // Check to the right
    [1, 0],      // Check down the column
    [1, 1],      // Check diagonal to the right
    [1, -1]      // Check diagonal to the left
]
function createBoard(size){
    var rows = [];
    for(var i = 0; i<size; i++){
        var cols = [];
        for(var j = 0; j<size; j++){
            cols.push(0);
        }
        rows.push(cols);
    }
    return rows;
};

function checkDirection(board, pos, dir){
  var cha = board[pos[0]][pos[1]];
if(cha === 0){
	return false
}
checkSum = 1;
  while (true){
    pos = [pos[0] + dir[0], pos[1] + dir[1]];
    if (pos[0] >= board.length || pos[1] >= board.length){
      break
    }
    var nextChar = board[pos[0]][pos[1]];
    if (nextChar != cha){
      break
    }
    checkSum += 1;
    if (checkSum === IN_A_ROW_TO_WIN){
      return true
    }
  }
  return false

}

function checkWin(board){
  for (var row = 0; row < board.length; row++){
    for (var col = 0; col < board.length; col++){
      var pos = [row, col];
      for (var dir = 0; dir < DIRECTIONS.length; dir++){
        if (checkDirection(board, [row, col], DIRECTIONS[dir])){
          return true
        }
      }
    }
  }
  for (var row = 0; row < board.length; row++){
    for (var col = 0; col < board.length; col++){
      if (board[row][col] === 0){
        return false
      }
    }
  }
  return undefined
};


document.getElementById("canvas").addEventListener("mousedown", move);
var size  = prompt("Game board size: ");
ctx = setup();		// Setup the canvas (I think..)
drawGrid(size, size);
var turn = 1;
board = createBoard(size);

