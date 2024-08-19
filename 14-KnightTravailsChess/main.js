import "./style.scss";


class Chessboard {
    constructor (boardId){
        this.boardElement = document.getElementById(boardId); 
        this.size = 8; 
        this.squares = []; //siehe: createBoard()
        this.createBoard(); 
    }

    createBoard(){
        for(let row = 0; row < this.size; row++){
            for( let col = 0; col < this.size; col++){
                const square = document.createElement('div');
                square.classList.add('square'); 
                //Jedes zweite square soll auf 'light' gesetzt werden, sonst 'dark'
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark'); 
                square.dataset.row = row; 
                square.dataset.col = col; 
                this.boardElement.appendChild(square); //Einfügen in das boardElement aka. chessboard
                this.squares.push(square); //Array muss vorher vorhanden/erstellt sein.
            }
        }
    }

    getSquare(row, col){
        return this.squares.find(square => square.dataset.row == row && square.dataset.col == col); 
    }
} 

