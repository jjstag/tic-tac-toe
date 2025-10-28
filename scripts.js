const Gameboard = (function () {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    const place = (player, spot) => {
        // player should be 1 or 2. spot should be 1-9
        spot--
        // make the spot begin at 0
        if (player == 2) {player = -1}
        // convert the board to a "1, 0, -1" format.
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
                console.log(rowValue)
                if (Math.abs(rowValue) === 3) {
                    return true
                }
            }
            
        }
        board[spot] = player
        if (checkForWin(board) === true) {
            console.log(`Player ${player} won!`)
        }
        return board
    } 
    return {
        place,
    }
})()

console.log(Gameboard.place(1, 1))
console.log(Gameboard.place(2, 4))
console.log(Gameboard.place(1, 2))
console.log(Gameboard.place(2, 5))
console.log(Gameboard.place(1, 3))