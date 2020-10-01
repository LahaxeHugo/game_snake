// Default Settings
var gridSize = {y: 15, x: 15};
var pixelSize = 31;
var snakeLengthInit = 3;
var speed = 150;
var fruitQuantityInit = 1;
const fruitType = ['apple', 'banana', 'strawberry', 'orange', 'kiwi'];

//Main Settings
var snakeLoop = false;

var grid = {};

var snake = [];
var snakeLength = 0;

var direction = 'none';
var directionPrev = 'none';
var directionTurn = false;

var fruitQuantityCurr = 0;

var scoreReset = true;

var popupOpen = false;
var dPadShow = false;
