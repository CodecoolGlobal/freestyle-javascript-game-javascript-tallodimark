const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficulty = urlParams.get('difficulty');
let monsterNumber = 0;
let coinNumber = 0;
let chestNumber = 0;
let swordNumber = 0;
let monstertHp = 0;
let heroHp = 0;
let difficultyTimer = 0;
if (difficulty === 'Easy') {
    monsterNumber = 5;
} else if (difficulty === 'Medium') {
    monsterNumber = 10;
} else if (difficulty === 'Hard') {
    monsterNumber = 20;
}

initGame();

function initGame() {
    this.drawBoard();
    this.populateBoard(monsterNumber);
    this.placeHero();
    this.initKeyUp();
}

function drawBoard () {
    console.log("draw");
}

function initKeyUp () {
    document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {console.log(event.key)
    } else if (event.key === 'ArrowDown') {console.log(event.key)
    } else if (event.key === 'ArrowLeft') {console.log(event.key)
    } else if (event.key === 'ArrowRight') {console.log(event.key)
    } else if (event.key === ' ') {console.log(event.key)
    } else {console.log('invalid')
    }
    })
}

function populateBoard(monsterNumber) {
    console.log(monsterNumber);
}

function moveMonserts(monsterNumber, difficultyTimer) {
    for (let i=0; i<monsterNumber; i++) {
        let currentMonster = document.querySelector('.monster' + i);
        let currentMonsterRow = currentMonster.dataset.row;
        let currentMonsterCol = currentMonster.dataset.col;
    }
}