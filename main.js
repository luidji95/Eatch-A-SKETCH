import './style.css'




const gridDiv = document.querySelector('.grid-div');
const rangeText = document.querySelector('.range');
const rangeInput = document.querySelector('.input-range');
const colorInput = document.getElementById('color-input');
const skechText = document.querySelector('.sketch');
const clear = document.querySelector('.clear');
const eraser = document.querySelector('.eraser');
const colormode = document.querySelector('.color-mode');
const randomMode = document.querySelector('.random-mode');

class SketchGenerate {
    constructor() {
        this.currentColor = "#ff0000";
    }

    getCurrentColor() {
        return this.currentColor;
    }

    setCurrentColor(value) {
        this.currentColor = value;
    }

    generateRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
}

const game = new SketchGenerate();

skechText.style.color = game.getCurrentColor();
rangeText.textContent = '16 x 16';

let isRandomMode = false;

function createGrid(size) {
    gridDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    gridDiv.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridDiv.appendChild(cell);

        cell.addEventListener('mouseover', function () {
            if (isRandomMode) {
                cell.style.backgroundColor = game.generateRandomColor();
            } else {
                cell.style.backgroundColor = game.getCurrentColor();
            }
        });
    }
}

createGrid(16);

function updateGrid() {
    const size = rangeInput.value;
    rangeText.textContent = `${size} x ${size}`;
    createGrid(size);
}

rangeInput.addEventListener('input', updateGrid);

colorInput.addEventListener('input', (ev) => {
    const color = ev.target.value;
    skechText.style.color = color;
    game.setCurrentColor(color);
    isRandomMode = false; 
});

clear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#fff';
    });
});

eraser.addEventListener('click', function () {
    game.setCurrentColor('#fff');
    isRandomMode = false; 
});

colormode.addEventListener('click', function () {
    game.setCurrentColor(skechText.style.color);
    isRandomMode = false; 
});

randomMode.addEventListener('click', function () {
    isRandomMode = true; 
});



   









