import './style.scss';

import Chessboard from './chessboard.js'
import Knight from './knight.js'

//Seiten Rules initialisieren 
document.addEventListener("DOMContentLoaded", () => {
    const chessboard = new Chessboard('chessboard'); 
    const knight = new Knight([0,0]); //startposition
    chessboard.placeKnight(knight.position[0], knight.position[1]);
    
    const output = document.getElementById('output'); 

    //Klick-Event move definieren 
    document.getElementById('chessboard').addEventListener('click', (event) => {
        //Sicherstellen das Zahlen als Integers behandelt werden. Ohne parseInt bleiben diese Werte Strings, was in numerischen Berechnungen zu unerwarteten Ergebnissen führen könnte.
        const row = parseInt(event.target.dataset.row); 
        const col = parseInt(event.target.dataset.col);
        const newPosition = [row, col]; 

        //Bevor neue Position gesetzt wird, muss Validierung stattfinden. 
        //Gebe mir alle valide mögliche Moves und überprüfe ob die neue Position mit eins dieser matched. 
        //pos[0,1] aus return von getValideMoves mit newPosition vergleichen. 
        if(knight.getNextValideMoves().some(pos => pos[0] === newPosition[0] && pos[1] === newPosition[1])){
            knight.move(newPosition); //Setze Position als aktuelle Position und aktualisiere previousPosition
            chessboard.placeKnight(knight.position[0], knight.position[1], knight.previousPosition)//Zeichne das Board mit der neuen Position und lösche das Hintergrund-Blau des vorherigen Feldes. 

            /**  ALTERNATIVE
            chessboard.placeKnight(newPosition)
            => Dann müsste folgendes geändert werden:
            placeKnight(position) {
                const [row, col] = position;
                ...
                }
            */
            output.textContent = `Knight moved to [${row}, ${col}]`; 
        } else{
            output.textContent = `Invalid move`; 
        }
    });
    
    console.log(knight.getNextValideMoves());
}); 