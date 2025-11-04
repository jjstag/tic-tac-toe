const namesForm = document.querySelector("#names-form")
const TTTBoard = document.querySelector("#ttt-board")
const restartBtn = document.querySelector("#restartBtn")
const textDisplay = document.querySelector("#text-display")
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let currentPlayer = 1
let hasWon
let playerOneName
let playerTwoName

const Gameboard = (function () {
    const place = (player, spot) => {
        // player should be 1 or 2. spot should be 1-9
        // if (player == 2) {player = -1}
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
                let rowValue = array.reduce((sum, index) => sum + board[index], 0);
                if (Math.abs(rowValue) === 3) return true;
            }
            if (!board.includes(0)) return false;
            return undefined;
        }
        if (checkValidPlacement(board, spot) === true) {
            board[spot] = player
        } else {
            console.log("Invalid placement!")
        }

        hasWon = checkForWin(board)

        if (hasWon === true) {
            if (player === -1) {
                console.log(`Player Two won!`)
                textDisplay.textContent = (`Player ${playerTwoName} won!`)
            } else if (player === 1) {
                console.log(`Player One won!`)
                textDisplay.textContent = (`Player ${playerOneName} won!`)
            } else {
                console.log("undefined won")
            }
        } else if (hasWon === false) {
            console.log(`It's a tie!`)
            textDisplay.textContent = (`It's a tie!`)
        } else {
            DOMController.setTurnText()
            gameController.switchTurn()
        }
        console.log(board)
        // return {
        //     checkValidPlacement,
        //     checkForWin,
        // }
    } 
    return {
        place,
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
    const setTurnText = () => {
        // console.log(`not ran yet. player: ${player}, currentplayer: ${currentPlayer}`)
        if (currentPlayer === 1) {
                // player = -1;
                textDisplay.textContent = `Player ${playerTwoName}'s turn`;
                console.log(`player two's turn`)
            } else if (currentPlayer === -1) {
                // player = 1;
                textDisplay.textContent = `Player ${playerOneName}'s turn`;
                console.log(`player one's turn`)
            } else {
                console.log("idk")
            }
            // console.log(`ran! player: ${player}, currentplayer: ${currentPlayer}`)
    }
    return {
        displayBoard,
        setTurnText,
    }
})()
// controls everything such as updating the DOM when a move is played and containing the logic for when clickHandler notifies us of a click
const gameController = (function () {
    restartBtn.addEventListener("click", () => {
        if (hasWon === true || hasWon === false) {
            board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            hasWon = undefined
            currentPlayer = 1
            textDisplay.textContent = "Player One's turn"

            DOMController.displayBoard(board)
        }
    })

    function doTurn(e) {
        if (hasWon === true || hasWon === false) return;
        if (e.target.id || board[e.target.dataset.spot] !== 0) return;
        Gameboard.place(currentPlayer, (e.target.dataset.spot))
        DOMController.displayBoard(board)
        console.log("turn done")
    }
    namesForm.addEventListener("submit", (e) => {
            e.preventDefault()
            playerOneName = e.target["player-one-name"].value
            playerTwoName = e.target["player-two-name"].value
            TTTBoard.addEventListener("click", doTurn)
            textDisplay.textContent = `Player ${playerOneName}'s turn`
            DOMController.displayBoard(board)
    })

    const switchTurn = () => {
        if (currentPlayer === 1) {
            currentPlayer = -1
        } else if (currentPlayer === -1) {
            currentPlayer = 1
        } else {
            console.log(`player ${player} is neither 1 nor -1.`)
        }
    }
    return {
        switchTurn,
    }
})()


// different players do different things?