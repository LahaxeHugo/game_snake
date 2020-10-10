function gridGenerate() {
	gridDisplay.style.width = gridSize.x*pixelSize+'px';
	gridDisplay.style.height = gridSize.y*pixelSize+'px';
	direction = 'none'; directionPrev = 'none';
	fruitQuantityCurr = 0;
	scoreReset = true;

	grid = [];
	gridDisplay.innerHTML = '';

	for (let i = 0; i < gridSize.y; i++) {
		grid[i] = [];
		for(let j = 0; j < gridSize.x; j++) {
			grid[i][j] = 0;
			let pixel = document.createElement('div');
			pixel.classList.add('pixel');
			pixel.setAttribute('data-y', i);
			pixel.setAttribute('data-x', j);
			pixel.style.top = i*pixelSize+'px';
			pixel.style.left = j*pixelSize+'px';
			pixel.style.width = pixelSize+'px';
			pixel.style.height = pixelSize+'px';
			gridDisplay.append(pixel);
		}
	}
	snakeInit();
	fruitGenerate(fruitQuantityInit);
}

function getPixelEl(y, x) {
	return document.querySelector('.pixel[data-y="'+y+'"][data-x="'+x+'"]');
}

function snakeInit() {
	snake = [];
	snakeLength = snakeLengthInit;

	let pos = {x: Math.floor(gridSize.x/2), y: Math.floor(gridSize.y/2)};
	let el = getPixelEl(pos.y, pos.x);
	el.classList.add('snake');
	el.setAttribute('type', 'head');
	snake.push({x: pos.x, y: pos.y, el: el});
	grid[(pos.y)][(pos.x)] = 1; //snake start position
}

function snakeUpdate() {
	if(scoreReset === true) {
		scoreReset = false;
		scoreEl.innerHTML = 0;
	}
	let currEl = snake[snake.length-1];
	let newEl = {x: currEl.x, y: currEl.y};
	let rotate = 0;
	switch (direction) {
		case 'left':	newEl.x--; rotate = -90;	break;
		case 'right':	newEl.x++; rotate = 90;		break;
		case 'up':		newEl.y--; rotate = 0;		break;
		case 'down':	newEl.y++; rotate = 180;	break;
	}

	if(newEl.x < 0 || newEl.x > gridSize.x-1 || newEl.y < 0 || newEl.y >gridSize.y-1 || grid[(newEl.y)][(newEl.x)] === 1) {
		clearInterval(snakeLoop);
		snakeLoop = false;
		gridGenerate();
	} else {
		let el = getPixelEl(newEl.y, newEl.x);
		el.classList.add('snake');
		el.setAttribute('type', 'head');
		el.style.transform = 'rotate('+rotate+'deg)';

		snake.push({x: newEl.x, y: newEl.y, el: el});
		if(grid[(newEl.y)][(newEl.x)] === 2) {
			snakeLength++;
			scoreEl.innerHTML = snakeLength-snakeLengthInit;
			el.classList.remove('fruit');
			fruitQuantityCurr--;
			if(fruitQuantityCurr === 0) fruitGenerate(fruitQuantityInit);
		}
		grid[(newEl.y)][(newEl.x)] = 1;
		if(snake.length > snakeLength) {
			grid[(snake[0].y)][(snake[0].x)] = 0;
			snake[0].el.classList.remove('snake');
			snake[0].el.removeAttribute('type');
			snake[0].el.style.transform = 'rotate(0deg)';
			snake.shift();
		}
		// snake[snake.length-2].el.style.transform = 'rotate(0deg)';
		snake[snake.length-2].el.style.transform = 'rotate('+rotate+'deg)';
		snake[snake.length-2].el.removeAttribute('type');
		if(directionTurn === true) {
			if(['rightdown', 'downleft', 'leftup', 'upright'].includes(direction+directionPrev)) {
				snake[snake.length-2].el.setAttribute('type', 'turn-2')
			} else {
				snake[snake.length-2].el.setAttribute('type', 'turn-1');
			}
		}
		snake[snake.length-2].el.classList.add('snake');
		snake[0].el.setAttribute('type', 'tail');
	}
}

function fruitGenerate(quantity = 1) {
	var emptyPixel = [];
	for(const y in grid) {
		for(let x in grid[y]) {
			if(grid[y][x] === 0) {
				emptyPixel.push({x: x,y: y});
			}
		}
	}
	for (let i = 0; i < quantity; i++) {
		if(emptyPixel.length !== 0) {
			let random = Math.floor(Math.random()*emptyPixel.length);
			let fruit = emptyPixel[random];
			grid[fruit.y][fruit.x] = 2;
			fruitQuantityCurr++;
			
			emptyPixel.splice(emptyPixel.indexOf(fruit), 1);
			let el = getPixelEl(fruit.y, fruit.x);
			el.classList.add('fruit');
			let randomFruit = Math.floor(Math.random()*fruitType.length);
			el.setAttribute('type', fruitType[randomFruit]);
		}
	}	
}