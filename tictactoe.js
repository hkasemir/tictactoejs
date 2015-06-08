
var tttBoard, clicks=0;
var EMPTY_KEY = ' '
var PLAYER_KEY = 'x'
var COMPUTER_KEY = 'o'
var IN_A_ROW_TO_WIN = 3
var DIRECTIONS = [
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
  var char = board[pos[0]][pos[1]];
  if(char === 0){return false}
  checkSum = 1;
  while (true){
    pos = [pos[0] + dir[0], pos[1] + dir[1]];
    if (pos[0] >= board.length || pos[1] >= board.length){
      break
    }
    var nextChar = board[pos[0]][pos[1]];
    if (nextChar != char){
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
        if (checkDirection(board, pos, DIRECTIONS[dir])){
          console.log('win!');
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
     

function drawBoard(brd){
  var gBoard = document.getElementById("gameboard");
  for(var i = 0; i<brd.length; i++){
    var bRow = document.createElement('div');
    bRow.className = "row";
    for(var j = 0; j<brd.length; j++){
      var bData = document.createElement('div');
      bData.className = "col";
      bData.id = "r"+i+"c"+j;
      bData.addEventListener("click", makeMove);
      bRow.appendChild(bData);
    }
	gBoard.appendChild(bRow);
  }
};


function makeMove(event){
  clickToBoard(event.target.id);
  checkWin(tttBoard);
}

function clickToBoard(boxId){
  var ex = document.createElement('div');
  var o = document.createElement('div');
  ex.className = 'x';
  o.className = 'o';
  var box = document.getElementById(boxId);
  var idArray = boxId.split('');
  var row = idArray[1];
  var col = idArray[3];
  if(clicks%2 === 0){
    box.appendChild(ex);
    tttBoard[row][col] = 1;
    clicks++;
  } else {
    box.appendChild(o);
    tttBoard[row][col] = -1;
    clicks++;
  }
  box.removeEventListener("click", makeMove);
}






var createGame = function() {

  var gameboard = document.getElementById("gameboard");
  var size = prompt('what size gameboard?');
  tttBoard = createBoard(size);
  drawBoard(tttBoard);
};
window.addEventListener('load', createGame);