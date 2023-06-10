export default class Apple {
    constructor(position =[10,10] ) {
        this.position = position;
    }
    // Ajouter une nouvelle position aléatoire à la pomme une fois mangée par le serpent.
    setNewPosition(widthInblocks, heightInblocks){ 
        const newX = Math.round(Math.random() * (widthInblocks - 1)); 
        const newY = Math.round(Math.random() * (heightInblocks - 1));
        this.position = [newX, newY];
    };
    // verifier que la pomme ne soit pas sur le serpent
    isOnSnake(snakeTocheck){        
        let isOnSnake = false;
        for(let block of snakeTocheck.body) {          
            if(this.position[0] === block[0] && this.position[1] === block[1])
            {
            isOnSnake = true;2 
            }
            return isOnSnake;
        };
    }
} 