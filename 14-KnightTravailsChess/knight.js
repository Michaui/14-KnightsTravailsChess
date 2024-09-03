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
    getNextValidMovesFrom(position){ //Next Knight valide Positionen & ebenfalls für die shortest way Funktion relevant.
        const [x, y] = position;
        return this.moveOffsets
            .map(([dx, dy]) => [x + dx, y + dy]) //Nehme die legetimen moves und gebe diese mit den addierte position zurück
            .filter(([newX, newY]) => newX >= 0 && newX < 8 && newY >= 0 && newY < 8); //filter legitimen moves bzw. Positionen die außerhalb der map sind.
    }

    //Breadth-First Search (BFS)
    //Der erste gefundene Pfad, der das Ziel erreicht, auch der kürzeste ist. Das liegt daran, dass BFS alle möglichen Pfade gleichmäßig in der Reihenfolge ihrer Länge durchläuft.

    findShortestWay(start, end){ //1. knight.findShortestWay([0,0],newPosition)
        const queue = [[start]]; //1. Pfad hinzugefügt, welches zuerst nur das Startfeld [[[0, 0]]] enthält. Nachträglich werden weitere hinzugefügt.
                                //10.2: Neue Pfade zur queue und als visted hinzufügen. 
        const visited = new Set(); //2. "Set" wird verwendet, weil es nur eindeutige Werte speichert (unique) und eine schnelle Überprüfung ermöglicht.
        visited.add(start.toString()); //3.toString() wird verwendet, um die Position (ein Array) als Zeichenkette zu speichern, da Arrays direkt nicht als Schlüssel in Sets verwendet werden können. (Siehe Notion: KnightTravailsChess)

        while (queue.length > 0) { //4. Diese Schleife wird durchlaufen, um alle mitgegebenen möglichen Wege zu erkunden.
            const path = queue.shift(); //5. Entfernt und erhält den ersten Pfad aus der Warteschlange. path = [[0, 0]] 
                                        //10.2: Zweite Iteration: Pfad aus queue holen: path = [[0, 0], [2, 1]]
            const position = path[path.length - 1]; //6. Holt die letzte Position im aktuellen path. 
                                                    //10.3: Aktuelle Position: [2, 1]

            //10.4: Noch nicht Knight "end" gelangt. 
            if(position[0] === end[0] && position[1] === end[1]){ //7. Überprüft, ob die aktuelle Position des Ritters der Zielposition (end) entspricht.
                return path; //8. Wenn ja, gibt der Algorithmus den aktuellen path zurück, da dies der kürzeste Weg ist (BFS garantiert, dass der erste gefundene Pfad der kürzeste ist).
            }

            this.getNextValidMovesFrom(position).forEach(nextPosition => { //8. Ruft getNextValidMovesFrom(position) auf, um alle gültigen Züge des Ritters von der aktuellen Position aus zu erhalten.
                // Für jede dieser neuen Positionen "nextPosition": Die Schleife erkundet so nach und nach alle möglichen Pfade.
                // 8.1: [2, 1], [1, 2]
                //10.5: Mögliche nächste Züge: [4, 2], [0, 2], [3, 3], [1, 3] Aktuelle Position: [2,1] -> Wird mit queue.push mit Startposition an die Liste gehangen. 
                //10.6: Mögliche nächste Züge: [3, 3], [0, 4], [2, 4], [2, 0] Aktuelle Position: [1,2] -> Wird mit queue.push mit Startposition an die Liste gehangen. 
                if (!visited.has(nextPosition.toString())){ //9. Überprüft, ob die Position bereits besucht wurde. 
                    visited.add(nextPosition.toString());//9.1 Wenn nicht, wird die Position zu visited hinzugefügt... 
                    queue.push([...path, nextPosition]) //9.2 und ein neuer Pfad, der die aktuelle Position und die neue Position enthält, wird zur queue hinzugefügt. 
                                                        //10 queue = [[[0, 0], [2, 1]], [[0, 0], [1, 2]]]
                                                        //11. queue = [[[0, 0], [1, 2]], [[0, 0], [2, 1], [4, 2]], [[0, 0], [2, 1], [0, 2]], [[0, 0], [2, 1], [3, 3]], [[0, 0], [2, 1], [1, 3]]]
                                                        //12. queue = [[[0, 0], [2, 1], [4, 2]], [[0, 0], [2, 1], [0, 2]], [[0, 0], [2, 1], [3, 3]], [[0, 0], [2, 1], [1, 3]], [[0, 0], [1, 2], [3, 3]], [[0, 0], [1, 2], [0, 4]], [[0, 0], [1, 2], [2, 4]], [[0, 0], [1, 2], [2, 0]]]

                                                    
                }
            });
        }
        return []; //Kein Pfad gefunden wurde.
    }

}

export default Knight; 