const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficulty = urlParams.get('difficulty');
const rows = 27
const cols = 54
const wallCount = 30
let intervalId;
let monsterNumber = 0;
let coinNumber = 0;
let chestNumber = 0;
let swordNumber = 0;
let monsterHp = 0;
let heroHp = 0;
let difficultyTimer = 0;
if (difficulty === 'Easy') {
    monsterNumber = 5;
    coinNumber = 10;
    chestNumber = 5;
    swordNumber = 3;
    monsterHp = 1;
    heroHp = 10;
    difficultyTimer = 1500;
} else if (difficulty === 'Medium') {
    monsterNumber = 10;
    coinNumber = 7;
    chestNumber = 3;
    swordNumber = 2;
    monsterHp = 2;
    heroHp = 7;
    difficultyTimer = 1000;
} else if (difficulty === 'Hard') {
    monsterNumber = 20;
    coinNumber = 4;
    chestNumber = 1;
    swordNumber = 1;
    monsterHp = 3;
    heroHp = 3;
    difficultyTimer = 750;
}

initGame();

function initGame() {
    this.drawBoard();
    this.drawWalls();
    this.populateBoard();
    this.initKeyUp();
    this.startTimedEvents();
}

function startTimedEvents() {
    if (!intervalId) {
        intervalId = setInterval(moveMonsters, difficultyTimer, monsterNumber)
    }
}

function drawBoard () {
    let gameField = document.querySelector(".game-field");
    this.setGameFieldSize(gameField);
    let cellIndex = 0
    for (let row = 0; row < rows; row++) {
        const rowElement = this.addRow(gameField);
        for (let col = 0; col < cols; col++) {
            this.addCell(rowElement, row, col);
            cellIndex++
        }
    }

}
function drawWalls () {
    let firstAndLastRowAndCol = document.querySelectorAll('[data-row="0"], [data-row="' + (rows - 1) + '"],' +
        '[data-col="0"], [data-col="' + (cols - 1) + '"]')
    for (let element of firstAndLastRowAndCol) {
        element.classList.add('wall')
    }
    let secondCol = Math.round(cols / 3)
    let thirdCol = Math.round((cols / 3) * 2)
    let rowGates = [`${Math.round(rows/6)}`, `${Math.round((rows/6) * 3)}`, `${Math.round((rows/6) * 5)}`]
    let colGates = [`${Math.round(cols/6)}`, `${Math.round((cols/6) * 3)}`, `${Math.round((cols/6) * 5)}`]
    let secondAndThirdCol = document.querySelectorAll('[data-col="' + secondCol + '"], [data-col="' + thirdCol + '"]')
    for (let element of secondAndThirdCol) {
        if (rowGates.includes(element.getAttribute('data-row'))) {
            element.classList.add("gate")
            continue
        }
        element.classList.add('wall')
    }
    let secondRow = Math.round(rows / 3)
    let thirdRow = Math.round((rows / 3) * 2)
    let secondAndThirdRow = document.querySelectorAll('[data-row="' + secondRow + '"], [data-row="' + thirdRow + '"]')
    for (let element of secondAndThirdRow) {
        if (colGates.includes(element.getAttribute('data-col'))) {
            element.classList.add("gate")
            continue
        }
        element.classList.add('wall')
    }
}
function addRow(gameField) {
    gameField.insertAdjacentHTML(
        'beforeend',
        '<div class="row"></div>'
    );
    return gameField.lastElementChild;
}
function addCell(rowElement, row, col) {
    rowElement.insertAdjacentHTML(
        'beforeend',
        `<div class="field"
                    data-row="${row}"
                    data-col="${col}"></div>`);
}
function setGameFieldSize(gameField) {
    gameField.style.width = (gameField.dataset.cellWidth * cols) + 'px';
    gameField.style.height = (gameField.dataset.cellHeight * rows) + 'px';
}


function heroMove(direction) {
    let heroCurrentPlace = document.querySelector(".hero");
    let heroCurrentRow = parseInt(heroCurrentPlace.dataset.row);
    let heroCurrentCol = parseInt(heroCurrentPlace.dataset.col);
    let newRow = heroCurrentRow;
    let newCol = heroCurrentCol;
    if (direction === 'up') {
        newRow -= 1;
    } else if (direction === "down") {
        newRow += 1;
    } else if (direction === "left") {
        newCol -= 1;
    } else if (direction === "right") {
        newCol += 1;
    }
    if (validateMovement("player", newRow, newCol)) {
        heroCurrentPlace.classList.remove('hero');
        heroCurrentPlace.removeAttribute("data-direction");
        let newHeroPlace = document.querySelector('[data-row="' + newRow + '"][data-col="' + newCol + '"]');
        newHeroPlace.classList.add('hero');
        newHeroPlace.setAttribute("data-direction", direction);
    } else {
        heroCurrentPlace.setAttribute("data-direction", direction);
    }
}

function validateMovement(type, row, col) {
    let newPlace = document.querySelector('[data-row="' + row + '"][data-col="' + col + '"]')
    if (type === "player") {
        if (newPlace.classList.contains("wall") || newPlace.classList.contains("monster") ||
            newPlace.classList.contains("chest") || newPlace.classList.contains("boss") ||
            newPlace.classList.contains("bush")) {
            return false;
            }
    } else if (type === "monster") {
        if (newPlace.classList.contains("wall") || newPlace.classList.contains("monster") ||
            newPlace.classList.contains("chest") || newPlace.classList.contains("boss") ||
            newPlace.classList.contains("bush") || newPlace.classList.contains("hero") ||
            newPlace.classList.contains("coins") || newPlace.classList.contains("sword")) {
            return false;
        }
    }
    return true;
}


function initKeyUp () {
    document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {heroMove('up')
    } else if (event.key === 'ArrowDown') {heroMove('down')
    } else if (event.key === 'ArrowLeft') {heroMove('left')
    } else if (event.key === 'ArrowRight') {heroMove('right')
    } else if (event.key === ' ') {console.log(event.key)
    } else {console.log('invalid')
    }
    })
}

function checkNeighborCells(randomRow, randomCol) {
    let rowBefore = 0;
    if (randomRow !== 0) {rowBefore = randomRow - 1}
    let rowAfter = randomRow + 1;
    if (rowAfter > rows - 1) {rowAfter = randomRow}
    let colBefore = 0;
    if (randomCol !== 0) {colBefore = randomCol - 1}
    let colAfter = randomCol + 1;
    if (colAfter > cols - 1) {colAfter = randomCol}
    for (let i = rowBefore; i < rowAfter + 1; i++) {
        if (document.querySelector('[data-row="' + i + '"][data-col="' + randomCol + '"]')
                .classList.contains("gate") ||
            document.querySelector('[data-row="' + i + '"][data-col="' + randomCol + '"]')
                .classList.contains("wall") ||
            document.querySelector('[data-row="' + i + '"][data-col="' + randomCol + '"]')
                .classList.contains("monster"))
            return false
    }
    for (let j = colBefore; j < colAfter + 1; j++) {
        if (document.querySelector('[data-row="' + randomRow + '"][data-col="' + j + '"]')
                .classList.contains("gate") ||
            document.querySelector('[data-row="' + randomRow + '"][data-col="' + j + '"]')
                .classList.contains("wall") ||
            document.querySelector('[data-row="' + randomRow + '"][data-col="' + j + '"]')
                .classList.contains("monster"))
            return false
    }
    return true
}

function populateBoard() {
    spawnObjects('monster', monsterNumber);
    spawnObjects('bush', wallCount);
    spawnObjects('coin', coinNumber);
    spawnObjects('hero', 1);
    spawnObjects('chest', chestNumber);
    spawnObjects('sword', swordNumber)
}

function spawnObjects(objectName, numberOfObject) {
    for (let i=0; i<arguments[1]; i++) {
        let checkNeighbor = false;
        while (!checkNeighbor) {
            let randomRow = getRandomInt(0, rows);
            let randomCol = getRandomInt(0, cols);
            checkNeighbor = checkNeighborCells(randomRow, randomCol);
            if (checkNeighbor) {
                let objectToPlace = document.querySelector('[data-row="' + randomRow + '"][data-col="' + randomCol + '"]')
                objectToPlace.classList.add(arguments[0]);
                if (arguments[0] === 'hero') {
                    objectToPlace.setAttribute("data-direction", "down")
                }
                if (arguments[0] === 'monster') {
                    objectToPlace.setAttribute('id', i)
                    objectToPlace.setAttribute("data-direction", "down")
                }
            }
        if (arguments[0] === 'monster') {
            document.querySelector(".stats").setAttribute("data-monster-" + i + "-hp", monsterHp)
        }

        }
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function moveMonsters(monsterNumber) {
    for (let i = 0; i < monsterNumber; i++) {
        let currentMonster = document.getElementById("monster" + i)
        let currentMonsterRow = parseInt(currentMonster.dataset.row);
        let currentMonsterCol = parseInt(currentMonster.dataset.col);
        let newMonsterRow = currentMonsterRow
        let newMonsterCol = currentMonsterCol
        let randomInt = getRandomInt(1,6)
        let direction = currentMonster.getAttribute("data-direction")
        switch (randomInt) {
            case 1:
                newMonsterCol -= 1;
                direction = "left"
                break;
            case 2:
                newMonsterCol += 1;
                direction = "right"
                break;
            case 3:
                newMonsterRow -= 1;
                direction = "up"
                break;
            case 4:
                newMonsterRow += 1;
                direction = "down"
                break;
            default:
                console.log("placeholder attack")}
        if (validateMovement("monster", newMonsterRow, newMonsterCol)) {
            currentMonster.classList.remove("monster")
            currentMonster.removeAttribute("id")
            currentMonster.removeAttribute("data-direction")
            let newMonsterPlace = document.querySelector('[data-row="' + newMonsterRow
                + '"][data-col="' + newMonsterCol + '"]');
            newMonsterPlace.classList.add('monster');
            newMonsterPlace.setAttribute("id", "monster" + i)
            newMonsterPlace.setAttribute("data-direction", direction);
            } else {
                currentMonster.setAttribute("data-direction", direction);
            }
        }
}
function placeHero() {
    let checkNeighbor = false
    while (!checkNeighbor) {
        let randomRow = getRandomInt(0, rows)
        let randomCol = getRandomInt(0, cols)
        checkNeighbor = checkNeighborCells(randomRow, randomCol)
        if (checkNeighbor) {
            let player = document.querySelector('[data-row="' + randomRow + '"][data-col="' + randomCol + '"]')
            player.classList.add("hero")
            player.setAttribute("data-direction", "down")
        }

    }
}