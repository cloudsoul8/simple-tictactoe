let board =[
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
]

let turn = 0;
let latest = [{row: -1, col: -1}]
let gameFinished = false

function turnOf() {
    if (turn % 2 == 0) {
        return 'X'
    }
    else {
        return 'O'
    }
}


function boardInit() {
    document.getElementById('game').innerText = ''

    board.forEach((row,i) => {
        const boardRow = document.createElement('div');
        boardRow.className = "board-row"

        
        row.forEach((col,j) => {
            const boardCell = document.createElement('div');    
            boardCell.innerText = col;
            boardCell.className = 'board-cell'

            let former = boardCell.innerText

            boardCell.onclick = () => {
                if (!(gameFinished || turn == 9)) {
                    cellPlace(i,j, boardCell)
                    boardCell.style.color = 'black'
                    former = turnOf()
                    checkIfEnd()
                }
                
            }
            boardCell.onmouseenter = () => {
                if (former == '-') {
                    boardCell.style.fontSize = '72px'
                    boardCell.style.color = 'gray'
                    if (turn % 2 == 0) {
                        boardCell.innerText = 'X'
                    }
                    else {
                        boardCell.innerText = 'O'
                    }
                }

            }
            boardCell.onmouseleave = () => {
                if (former == '-') {
                    boardCell.style.fontSize = '64px'
                    boardCell.innerText = '-'
                    boardCell.style.color = 'black'
                }
            }
            

            boardRow.appendChild(boardCell);

        })

        document.getElementById('game').appendChild(boardRow)
    })

}


function cellPlace(row, col, boardCell) {
    if (!['X','O'].includes(board[row][col])) {
        if(turn % 2 == 0) {
            console.log('x')
            board[row][col] = 'X'
            boardCell.innerText = 'X'
        }
        else {
            console.log('o')
            board[row][col] = 'O'
            boardCell.innerText = 'O'
        }
        latest.row = row
        latest.col = col
        
    }
}

function checkIfEnd() {
    console.log(turnOf())
    whoseTurn = turnOf()

    let turnRow = Array(3).fill(whoseTurn)
    let vertical = []
    let horizontal= []
    let diagonalDown = []
    let diagonalUp = []

    console.log(latest)
    for (i = 0; i < 3; i++) {
        vertical.push(board[latest.row][i])
        horizontal.push(board[i][latest.col])
        diagonalDown.push(board[i][i])
        diagonalUp.push(board[i][2-i])
    }


    if (horizontal.join() == turnRow) {
        console.log(whoseTurn + " won")
        gameFinished = true
    }

    if (vertical.join() == turnRow) {
        console.log(whoseTurn + " won")
        gameFinished = true
    }

    if (diagonalDown.join() == turnRow) {
        console.log(whoseTurn + " won")
        gameFinished = true
    }

    if (diagonalUp.join() == turnRow) {
        console.log(whoseTurn + " won")
        gameFinished = true
    }

    if (turn == 8 || gameFinished) {
        showEndScreen(whoseTurn)
    } else {
        turn++
    }

}

function showEndScreen(win) {
    const remarks = document.getElementById('remarks')
    const remarksText = document.createElement('p')

    if (gameFinished) {
        remarksText.innerText = `${win} has won the game!`
    }
    else {
        remarksText.innerText = `it's a tie...`
        gameFinished = true
    }
    
    

    const retry = document.createElement('button')
    retry.innerText = 'Restart Game'
    retry.onclick = restartBoard;

    remarks.appendChild(remarksText)
    remarks.appendChild(retry)

    document.getElementById("game-container").appendChild(remarks)

    
}


function restartBoard() {
    board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ]
    turn = 0;
    latest = [{row: -1, col: -1}]
    gameFinished = false
    boardInit()

    document.getElementById("remarks").innerText = '';

}


boardInit();