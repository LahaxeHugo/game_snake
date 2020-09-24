var gridSize = {y: 15, x: 15};
var pixelSize = 31;
var snakeLengthInit = 3;
var speed = 150;
var fruitQuantityInit = 1;
const fruitType = ['apple', 'banana', 'strawberry', 'orange', 'kiwi'];

var snakeLoop = false;

var grid = {};
const gridDisplay = document.getElementById('grid');

var snake = [];
var snakeLength = 0;

var direction = 'none';
var directionPrev = 'none';
var directionTurn = false;
var directionInit = true;

var fruitQuantityCurr = 0;

var scoreReset = true;
const scoreEl = document.querySelector('.score > span');
scoreEl.innerHTML = 0;

var popupOpen = false;
var dPadShow = false;
