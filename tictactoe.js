

BOARD_SIZE = 3
EMPTY_KEY = ' '
PLAYER_KEY = 'x'
COMPUTER_KEY = 'o'
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

rowAlpha = []
for (var i = 0; i < BOARD_SIZE; i++) {
  rowAlpha.push(String.fromCharCode(65+i))
}


function stringBoard(board){
  var strBoard = '';
  
  // column numbers
  for (var k = 0; k <= board.length; k++) {
    strBoard += ' ' + k.toString() + ' ';
  };
  strBoard += '\n';
  
  for (var i = 0; i < board.length; i++){
    // puts the signifying A, B, C etc. next to the rows.
    strBoard += ' ' + rowAlpha[i] + ' ';
    for (var j = 0; j < board.length; j++){
      key = EMPTY_KEY;
      if (board[i][j] == 1){
        key = PLAYER_KEY
      } else if (board[i][j] == -1){
        key = COMPUTER_KEY
      };
      strBoard += '[' + key + ']';
    }
    strBoard += '\n';
  }
  return strBoard
};

function computerMove(board){
  var row = 1, column = 1, esc = 0;
  while (board[row][column] != 0){
    column = Math.floor(Math.random() * board.length);
    console.log(' computed column: ' + column)
    row = Math.floor(Math.random() * board.length);
    console.log(' computed row: ' + row)
    esc += 1;
    if (esc >=20){
      console.log('too many while loops');
      break
    }
  }
  board[row][column] = -1;
}

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
          




var board = createBoard(BOARD_SIZE);
console.log(stringBoard(board));
computerMove(board);
console.log(board)
computerMove(board);
console.log(board)
computerMove(board);
console.log(board)
computerMove(board);
console.log(board)

