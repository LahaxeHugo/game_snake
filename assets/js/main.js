// Main
const gridDisplay = document.getElementById('grid');
const scoreEl = document.querySelector('.score > span');
scoreEl.innerHTML = 0;
const EEStyle = document.getElementById('custom-style');

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
const settEasterEgg = document.getElementById('easter-egg');
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

// Settings default value
settGridX.value = gridSize.x;
settGridY.value = gridSize.y;
settPixelSize.value = pixelSize;
settLengthInit.value = snakeLengthInit;
settSpeed.value = speed;
settFruitQuantity.value = fruitQuantityInit;
settEasterEgg.value = easterEgg;
settDPadDisplay.checked = dPadShow;
dPadToggle(dPadShow);
EEModeSwitch(easterEgg);

gridGenerate();

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
	easterEgg = settEasterEgg.value;
	dPadToggle(settDPadDisplay.checked);

	clearInterval(snakeLoop);
	snakeLoop = false;

	EEModeSwitch(easterEgg);
	gridGenerate();
	popupToggle();
});

// Play Key Z,Q,S,D or ↑,→,↓,←
document.addEventListener('keydown', e => {
	if(popupOpen === false) {
		let key = e.keyCode;
		if([37, 38, 39, 40, 81, 90, 68, 83].includes(key)) {
			if(snakeLoop === false) startLoop();
			if(key === 37 || key === 81) direction = 'left';
			if(key === 38 || key === 90) direction = 'up';
			if(key === 39 || key === 68) direction = 'right';
			if(key === 40 || key === 83) direction = 'down';
		}
		EESaveKey(e.key);
	}
});

// Play Dpad
for(let i = 0; i < dPadArrow.length; i++) {
	let dPadEl = dPadArrow[i];
	dPadEl.addEventListener('click', function() {
		if(popupOpen === false) {
			if(snakeLoop === false) startLoop();
			direction = this.getAttribute('direction');
		}
	});
}

// Easter Egg
function EEModeSwitch(type = 'default') {
	if(!EEType.includes(type)) type = 'default';
	
	EEStyle.innerHTML = '';
	if(['default','léa'].includes(type)) {
		fruitType = fruitTypeDefault;
	}
	else if(type === 'stacy') {
		EEStyle.innerHTML = '.snake[type="head"] {background-image: url("assets/img/rat.png");}';
		fruitType = ['cheese'];
	}
	else if(type === 'banane') {
		let html = '.snake[type="head"] {background-image: url("assets/img/whale.png");}';
		html += '.snake, .snake[type="turn-1"], .snake[type="turn-2"], .snake[type="tail"] {background-image: url("assets/img/bubbles.png"); background-size: 70%;border-radius: 0;}';
		EEStyle.innerHTML = html;
		fruitType = ['banana'];
	}
	else if(type === 'classic') {
		let html = '.snake, .snake[type="tail"] {background: green;}';
		html += '.snake[type="head"] {background: green; border-radius: 50% 50% 0 0}';
		html += '.snake[type="turn-1"] {background: radial-gradient(circle at top right, green 70%, transparent 73%);}';
		html += '.snake[type="turn-2"] {background: radial-gradient(circle at top left, green 70%, transparent 73%);}';
		EEStyle.innerHTML = html;
		fruitType = ['apple'];

	}

	let tFruits = document.querySelectorAll('.fruit');
	for(let i = 0; i < tFruits.length; i++) {
		grid[(tFruits[i].getAttribute('data-y'))][(tFruits[i].getAttribute('data-x'))] = 0;
		tFruits[i].classList.remove('fruit');
	}
	fruitGenerate(fruitQuantityCurr);
	fruitQuantityCurr /= 2;
}

function EESaveKey(key) {
	EEString += key;
	if(EEString.length > EETypeLongest.length) {
		EEString = EEString.substr(EEString.length-EETypeLongest.length);
	}
	EEWordCheck(EEString);
}

function EEWordCheck(word) {
	for(let i = 0; i < EEType.length; i++) {
		let reg = EEType[i]+'$';
		let regex = new RegExp(reg, "g");
		match = word.match(regex);
		if(match !== null) {
			EEModeSwitch(match[0]);
			break;
		}
	}
}