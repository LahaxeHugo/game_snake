// Grid + Score 
const gridDisplay = document.getElementById('grid');
const scoreEl = document.querySelector('.score > span');
scoreEl.innerHTML = 0;

// Popup
const backdrop = document.getElementById('backdrop');
const settingsPopup = document.getElementById('settings-popup');
const settingsToggle = document.getElementById('settings-toggle');
const settingsClose = document.getElementById('settings-close');
const settingsForm = document.getElementById('settings-form');

// Settings Input
const settGridX = document.getElementById('grid-x');
const settGridY = document.getElementById('grid-y');
const settPixelSize = document.getElementById('pixel-size');
const settLengthInit = document.getElementById('length-init');
const settSpeed = document.getElementById('speed');
const settFruitQuantity = document.getElementById('fruit-quantity');
const settDPadDisplay = document.getElementById('d-pad-display');

// Dpad Elements
const dPad = document.getElementById('d-pad');
const dPadArrow = document.querySelectorAll('#d-pad > .pad');


function popupToggle(toggle = false) {
	if(toggle === false) {
		backdrop.style.display = 'none';
		settingsPopup.style.display = 'none';
		popupOpen = false;
	} else {
		backdrop.style.display = 'block';
		settingsPopup.style.display = 'block';
		popupOpen = true;
	}
}

function dPadToggle(toggle = false) {
	dPad.style.display = (toggle) ? 'block' : 'none';
}

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

// Toggle Dpad Mobile
if(window.innerWidth < 500) {
	pixelSize = Math.floor(window.innerWidth/gridSize.x)-1;
	dPadShow = true;
}

gridGenerate();

// Settings default value
settGridX.value = gridSize.x;
settGridY.value = gridSize.y;
settPixelSize.value = pixelSize;
settLengthInit.value = snakeLengthInit;
settSpeed.value = speed;
settFruitQuantity.value = fruitQuantityInit;
settDPadDisplay.checked = dPadShow;
dPadToggle(dPadShow);

settingsToggle.addEventListener('click', () => { popupToggle(true); });
settingsClose.addEventListener('click', () => { popupToggle(); });
backdrop.addEventListener('click', () => { popupToggle(); });

// Settings Update
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
	snakeLoop = false;
	gridGenerate();
	popupToggle();
});


// Play Key Z,Q,S,D or ↑,→,↓,←
document.addEventListener('keydown', e => {
	let key = e.keyCode;
	if([37, 38, 39, 40, 81, 90, 68, 83].includes(key) && popupOpen === false) {
		if(snakeLoop === false) startLoop();
		if(key === 37 || key === 81) direction = 'left';
		if(key === 38 || key === 90) direction = 'up';
		if(key === 39 || key === 68) direction = 'right';
		if(key === 40 || key === 83) direction = 'down';
	}
});

// Play Dpad
for(var i = 0; i < dPadArrow.length; i++) {
	var dPadEl = dPadArrow[i];
	dPadEl.addEventListener('click', function() {
		if(popupOpen === false) {
			if(snakeLoop === false) startLoop();
			direction = this.getAttribute('direction');
		}
	});
}
