export default  class Snake {
    constructor(direction, ...body) {
        this.direction = direction;
        this.body = body;
        this.eateApple = false ;
    }
    // Methode qui va permettre à notre serpent d'avancer
    advance(){
        const nextPosition = this.body[0].slice();
        switch (this.direction)
        {
            case "left":
                nextPosition[0] -= 1;
                break;
            case "right":
                nextPosition[0] += 1;
                break;
            case "down":
                nextPosition[1] += 1;
                break;
            case "up":
                    nextPosition[1] -= 1; 
                break;  
            default:
                throw("Invalid Direction");
        }
        this.body.unshift(nextPosition); // avance d'une position
        if (!this.eateApple) // doit etre
            this.body.pop(); //Supprime le dernier bloc
        else 
            this.eateApple = false; // eteinte le boolean eate
        
    };
    // Diriger le serpent
    setDirection(newDirection){
                let allowDirection;
                switch (this.direction){
                    case "left":
                    case "right":
                        allowDirection = ["up", "down"];
                        break;
                    case "down":
                    case "up":
                        allowDirection = ["left", "right"];
                        break;  
                    default:
                        throw("Invalid Direction");
                    
                }  
                if (allowDirection.includes(newDirection)) {
                    this.direction = newDirection;
                }
    };
    // verifier le cas de collision
    checkCollision(widthInblocks, heightInblocks){
            let wallCollision = false; // toucher le mur ?
            let snakeCollision = false; // le serpent s'est touché lui même ?
            const [head,...rest]= this.body;
            const [snakeX, snakeY] = head;
            const minX = 0;
            const minY= 0;
            const maxX = widthInblocks - 1;
            const maxY=  heightInblocks - 1;
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX; //  mur de gauche ou mur de droit
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; // mur d'en haut ou mur d'en-bas

            if( isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)  { // collision avec un des mur
            wallCollision = true;
            }

            for (let block of rest) {            
                if(snakeX === block[0] && snakeY === block[1]) {                   
                snakeCollision = true;
                }
            }

        return wallCollision || snakeCollision;
    };
    // Methode pour manger la pomme 
    isEatingApple (appleToEat){          
        const head = this.body[0]; // Déterminer le la tete du snake
        if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
        //verifie si la tete du serpent est egale aux coordonnées de la pomme
            return true;
                    else
            return false;
    };
}