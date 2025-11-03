const TTTBoard = document.querySelector("#ttt-board")
const restartBtn = document.querySelector("#restartBtn")
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let player = 1
let hasWon

const Gameboard = (function () {
    const place = (player, spot) => {
        // player should be 1 or 2. spot should be 1-9
        if (player == 2) {player = -1}
        // convert the board to a "1, 0, -1" format.
        function checkValidPlacement(board, spot) {
            if (board[spot] === 0) {
                return true;
            } else {
                console.log(`board: ${board} spot: ${spot} board[spot]: ${board[spot]}`)
                return false;
            }
        }
        function checkForWin(board) {
            const wins = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ]
            for (let array of wins) {
                let rowValue = 0
                for (let number of array) {
                    rowValue += board[number]
                }
                // console.log(rowValue)
                if (Math.abs(rowValue) === 3) {
                    return true
                } else if (!board.includes(0)) {
                    return false
                }
            }
            
        }
        if (checkValidPlacement(board, spot) === true) {
            board[spot] = player
        } else {
            console.log("Invalid placement!")
        }

        hasWon = checkForWin(board)

        if (hasWon === true) {
            console.log(`Player ${player} won!`)
            TTTBoard.removeEventListener("click", doTurn)
        } else if (hasWon === false) {
            console.log(`It's a tie!`)
        }
        console.log(board)
        // return {
        //     checkValidPlacement,
        //     checkForWin,
        // }
    } 
    return {
        place,
        hasWon
    }
})()

const DOMController = (function () {
    const displayBoard = (board) => {
        TTTBoard.textContent = ""

        let i = 0
        for (spot of board) {
            const tile = document.createElement("div")
            tile.className = "tile"
            tile.dataset.spot = i
            i++
            
            let text
            if (spot === 1) {
                text = "X"
            } else if (spot === -1) {
                text = "O"
            // additional but technically unnecessary check
            } else {
                text = ""
            }
            tile.textContent = text

            TTTBoard.appendChild(tile)
        }
    }
    return {
        displayBoard,
    }
})()
function doTurn(e) {
    if (e.target.id || board[e.target.dataset.spot] !== 0) return;
    // console.log(hasWon)
    // console.log((e.target.dataset.spot))
    // do not update display in the event of a winning move
    Gameboard.place(player, (e.target.dataset.spot))
    DOMController.displayBoard(board)
    if (player === 1) player = 2; else player = 1;
}
// controls everything such as updating the DOM when a move is played and containing the logic for when clickHandler notifies us of a click
const gameController = (function () {
    restartBtn.addEventListener("click", () => {
        if (hasWon === true || hasWon === false) {
            TTTBoard.addEventListener("click", doTurn)
            board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            DOMController.displayBoard(board)

        }
    })
    TTTBoard.addEventListener("click", doTurn)
})()

//take eventlistener out but define function inside gamecontroller

// put the initalizing in gameController
DOMController.displayBoard(board)

// console.log(Gameboard.place(1, 1))
// console.log(Gameboard.place(2, 4))
// console.log(Gameboard.place(1, 2))
// console.log(Gameboard.place(2, 5))
// console.log(Gameboard.place(1, 6))
// console.log(Gameboard.place(1, 6))
// console.log(Gameboard.place(2, 3))
// console.log(Gameboard.place(1, 7))
// console.log(Gameboard.place(2, 8))
// console.log(Gameboard.place(1, 9))