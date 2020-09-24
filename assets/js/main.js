const backdrop = document.getElementById('backdrop');
const settingsPopup = document.getElementById('settings-popup');
const settingsToggle = document.getElementById('settings-toggle');
const settingsClose = document.getElementById('settings-close');
const settingsForm = document.getElementById('settings-form');

const settGridX = document.getElementById('grid-x');
const settGridY = document.getElementById('grid-y');
const settPixelSize = document.getElementById('pixel-size');
const settLengthInit = document.getElementById('length-init');
const settSpeed = document.getElementById('speed');
const settFruitQuantity = document.getElementById('fruit-quantity');
const settDPadDisplay = document.getElementById('d-pad-display');

const dPad = document.getElementById('d-pad');
const dPadArrow = document.querySelectorAll('#d-pad > .pad');

function startLoop() {
	snakeLoop = setInterval(function() {
		if(direction !== 'none' && popupOpen === false) {
			if(['updown','downup', 'rightleft', 'leftright'].includes(direction+directionPrev)) {
				direction = directionPrev;
			}
			if(direction !== directionPrev) directionTurn = true;
			snakeUpdate();
			directionTurn = false;
			directionPrev = direction;
		}
	}, speed);
}

function closePopup() {
	backdrop.style.display = 'none';
	settingsPopup.style.display = 'none';
	popupOpen = false;
}

function dPadToggle(toggle = false) {
	if(toggle === false) {
		dPad.style.display = 'none';
	} else {
		dPad.style.display = 'block';
	}
}

if(window.innerWidth < 500) {
	pixelSize = Math.floor(window.innerWidth/gridSize.x)-1;
	dPadShow = true;
}
gridGenerate();

settGridX.value = gridSize.x;
settGridY.value = gridSize.y;
settPixelSize.value = pixelSize;
settLengthInit.value = snakeLengthInit;
settSpeed.value = speed;
settFruitQuantity.value = fruitQuantityInit;
settDPadDisplay.checked = dPadShow;
dPadToggle(dPadShow);

settingsToggle.addEventListener('click', () => {
	backdrop.style.display = 'block';
	settingsPopup.style.display = 'block';
	popupOpen = true;
});

settingsClose.addEventListener('click', closePopup);
backdrop.addEventListener('click', closePopup);

settingsForm.addEventListener('submit', e => {
	e.preventDefault();
	gridSize.x = settGridX.value;
	gridSize.y = settGridY.value;
	pixelSize = settPixelSize.value;
	snakeLengthInit = settLengthInit.value;
	speed = settSpeed.value;
	fruitQuantityInit = settFruitQuantity.value;
	dPadToggle(settDPadDisplay.checked);

	clearInterval(snakeLoop);
	gridGenerate();
	startLoop();
	closePopup();
});

document.addEventListener('keydown', e => {
	let key = e.keyCode;
	if([37, 38, 39, 40, 81, 90, 68, 83].includes(key) && popupOpen === false) {
		if(snakeLoop === false) startLoop();
		if(key === 37 || key === 81) direction = 'left';
		if(key === 38 || key === 90) direction = 'up';
		if(key === 39 || key === 68) direction = 'right';
		if(key === 40 || key === 83) direction = 'down';
		if(directionInit === true) {
			directionPrev = direction;
			directionInit = false;
		}
	}
});

for(var i = 0; i < dPadArrow.length; i++) {
	var dPadEl = dPadArrow[i];
	dPadEl.addEventListener('click', function() {
		if(popupOpen === false) {
			direction = this.getAttribute('direction');
			if(directionInit === true) {
				directionPrev = direction;
				directionInit = false;
			}
		}
	});
}
