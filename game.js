const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficulty = urlParams.get('difficulty');

initGame();

function initGame() {
    this.drawBoard();
    this.initKeyUp();

    // Your game can start here, but define separate functions, don't write everything in here :)

}
function drawBoard () {
 console.log("draw")
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
