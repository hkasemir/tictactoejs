// function getUserInput(question, callback) {
//  var readline = require('readline');
//
//  var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//  });
//
//  rl.question(question, function(answer) {
//    callback(answer);
//    rl.close();
//  });
//};



BOARD_SIZE = 3
EMPTY_KEY = ' '
PLAYER_KEY = 'x'
COMPUTER_KEY = 'o'


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



//function getPlayerColumn(gameboard){
//  getUserInput("Choose a column (1, 2, etc.): ", function(col){
//    var colInt
//    if(Number.isInteger(parseFloat(col))){
//      colInt = parseInt(col)
//    };
//    if (colInt && colInt < gameboard.length + 1 && colInt >= 0){
//      console.log('yep');
//    } else {
//      console.log('nope')
//    };
//  });
//};



var board = createBoard(BOARD_SIZE);
console.log(stringBoard(board));


