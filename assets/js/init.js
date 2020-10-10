// Default Settings
var gridSize = {y: 15, x: 15};
var pixelSize = 31;
var snakeLengthInit = 3;
var speed = 150;
var fruitQuantityInit = 1;
const fruitTypeDefault = ['apple', 'banana', 'strawberry', 'orange', 'kiwi'];
var easterEgg = '';

// Main Settings
var snakeLoop = false;

var grid = [];

var snake = [];
var snakeLength = 0;

var direction = 'none';
var directionPrev = 'none';
var directionTurn = false;

var fruitQuantityCurr = 0;
var fruitType = fruitTypeDefault;

var scoreReset = true;

var popupOpen = false;
var dPadShow = false;

// Easter Egg
const EEType = ['default', 'léa', 'stacy', 'banane', 'classic'];
const EETypeLongest = EEType.reduce(function (a, b) { return a.length > b.length ? a : b; });
var EEString = '';
