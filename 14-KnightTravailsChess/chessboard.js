class Chessboard {
    constructor (boardId){
        this.boardElement = document.getElementById(boardId); 
        this.size = 8; 
        this.squares = []; //siehe: createBoard() -> Array muss vor createBoard erstellt sein. 
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
                this.boardElement.appendChild(square); //Einfügen Div/Square in das boardElement aka. chessboard
                this.squares.push(square); //Array muss vorher vorhanden/erstellt sein. Füge Div/Square ein.
            }
        }
    }

    // getSquare(row, col) { // ALTERNATIVE: Wenn Zuweisung der Squares/Divs nicht in einem Array abrufbar wäre 
        //Die Kombination row & col bedeutet, dass nur ein Element ausgewählt wird, das beide Bedingungen erfüllt.
        //return this.boardElement.querySelector(`[data-row='${row}'][data-col='${col}']`);
    // }

    getSquare(row, col){
        return this.squares.find(square => square.dataset.row == row && square.dataset.col == col); 
    }

    clearBoard(){
        this.squares.forEach(square => {square.textContent = '';});
    }

    placeKnight(row, col, previousPosition){
        this.clearBoard(); 

        if (previousPosition) {
            // Hintergrund des vorherigen Feldes zurücksetzen
            const prevSquare = this.getSquare(previousPosition[0], previousPosition[1]);
            prevSquare.classList.remove('knight');
        }

        const square = this.getSquare(row, col); 
        square.textContent = '♘'; 
        square.classList.add('knight'); 
    }
    
    displayPath(path){
        this.clearBoard(); 
        this.squares.forEach(square => {
            if(square.classList.contains('knight')){
                square.classList.remove('knight'); 
            }
        })

        path.forEach((position, index) => {
            const square = this.getSquare(position[0], position[1]); 
            square.textContent = index === 0 ? 'S' : index === path.length - 1 ? 'E' : '♘' // Start (S), Ende (E), sonst Knight (♘)
            square.classList.add('knight'); 
        });
    }
} 

export default Chessboard; 