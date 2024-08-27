class Knight {
    constructor(startPosition){ // new Knight([0, 0]);
        //Jede Figur hat eine Startposition 
        this.position = startPosition; // Knight.position[0,1] wäre Position [0,0] -> Also Knight.position[1] ist die zweite Position y=0; und Knight.position[0] ist gleich x=0;  
        this.moveOffsets = [ // Jede Figur hat ihr eigenes Move-Patttern
            [2, 1], [2, -1], [-2, 1],[-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1 , -2]
        ];
        this.previousPosition = null; //Alte Position & default null
    }

    getNextValideMoves(){
        const [x, y] = this.position;
        return this.moveOffsets
            .map(([dx, dy]) => [x + dx, y + dy]) //Nehme die legetimen moves und gebe diese mit den addierte position zurück
            //FEHLER: weil map ein Array zurückgibt mit weiteren Arrays. Demnach müssen die Arguments auch so behandelt werden. 
            //.filter((newX, newY) => newX >= 0 && newX < 8 && newY >= 0 && newY < 8); //filter legitimen moves bzw. Positionen die außerhalb der map sind.
            .filter(([newX, newY]) => newX >= 0 && newX < 8 && newY >= 0 && newY < 8); //filter legitimen moves bzw. Positionen die außerhalb der map sind.
    }

    move(newPosition) {
        this.previousPosition = this.position; // Setze die aktuelle Position als vorherige Position
        this.position = newPosition; // Aktualisiere die Position
    }

    //FÜR REKUSRIVES VORGEHEN
    getNextValidMovesFrom(position){ //Für die shortest way Funktion
        const [x, y] = position;
        return this.moveOffsets
            .map(([dx, dy]) => [x + dx, y + dy]) //Nehme die legetimen moves und gebe diese mit den addierte position zurück
            .filter(([newX, newY]) => newX >= 0 && newX < 8 && newY >= 0 && newY < 8); //filter legitimen moves bzw. Positionen die außerhalb der map sind.
    }

    //ERKLÄRUNG!
    findShortestWay(start, end){
        const queue = [[start]]; 
        const visited = new Set(); 
        visited.add(start.toString()); 

        while (queue.length > 0) {
            const path = queue.shift(); 
            const position = path[path.length - 1]; 

            if(position[0] === end[0] && position[1] === end[1]){
                return path; 
            }

            this.getNextValidMovesFrom(position).forEach(nextPosition => {
                if (!visited.has(nextPosition.toString())){
                    visited.add(nextPosition.toString()); 
                    queue.push([...path, nextPosition])
                }
            });
        }
        return []; //Kein Pfad gefunden
    }

}

export default Knight; 