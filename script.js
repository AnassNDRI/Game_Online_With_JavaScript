window.onload = () =>{ // se lance lorsque la fenetre s'affiche 
 
    // Class Game
    class Game {
        constructor () {
            this.canvasWidth = 900; // Largeur du canvas
            this.canvasHeight = 600; // hauteur du canvas
            this.blockSize = 30;  // Taille d'un block
            this.widthInblocks = this.canvasWidth/this.blockSize;  // largeur total de tous les blocks
            this.heightInblocks = this.canvasHeight/this.blockSize; // Hauteur total de tous les blocks
            this.canvas =  document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d'); // pour dessiner dans le canvas
            this.centreX = this.canvasWidth / 2;   // centre des X
            this.centreY = this.canvasHeight / 2;  // centre des y 
            this.delay;      // Delai
            this.snakee;     // constiable d'instaciation d'un neauxeau serpant
            this.applee;     // constiable d'instaciation d'une nouvelle Pomme
            this.score;
            this.timeOut;
        }

        init() {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            this.canvas.style.border = "30px solid gray";
            this.canvas.style.margin ="50px auto";
            this.canvas.style.display = "block";
            this.canvas.style.backgroundColor = "#ddd";
            document.body.appendChild(this.canvas); // attacher notre canvas à la page html
            this.launch(); // lance le jeu
        }
        // Cette functio2 n reinialise le jeu et le relance uniquement après  un game over
        launch() { // lancer le jeu
        // if(snakee.checkCollision()){      
                this.snakee = new Snake("right", [6,4], [5,4],[4,4],[3,4],[2,4] ); // initialiser à la meme valeur de depart
                this.applee = new Apple() // reecrée la pomme
                this.delay = 300; // pour initialiser à la valeur de debut si jamais après la function speedUp
                this.score = 0;
                clearTimeout(this.timeOut);
                this.refreshCanvas(); // se fait à la fin la fonction init     
        // } 
        }     
        // construction du canvas
        refreshCanvas() { 
    
            this.snakee.advance();
            if(this.snakee.checkCollision(this.widthInblocks, this.heightInblocks)){
            Drawing.gameOver(this.ctx, this.centreX, this.centreY); 

            } else {
                if(this.snakee.isEatingApple(this.applee)){  // verifie si le serpent a mangé une pomme    
                    this.score++;
                    this.snakee.eateApple = true;
                    do {
                        this.applee.setNewPosition(this.widthInblocks, this.heightInblocks);
                    }
                    while(this.applee.isOnSnake(this.snakee)) // verifier si la nouvelle pomme est sur 
                                                // le nouveau serpent
                                                    // si oui il revient donner une nouvelle 
                                                    // dans l'instruction du "do" jusqu'au contraire de l'instruction "do"    
                    if(this.score % 5 == 0) { // Verification si le score a atteint 5
                        this.speedUp();
                    }                                  
                }                                      
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // effacer le contenu du canvas
                Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score); // affiche le nouveau score à refresh de la page
                Drawing.drawSnake(this.ctx, this.blockSize, this.snakee);
                Drawing.drawApple(this.ctx, this.blockSize, this.applee); 
                this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.delay );
            } 
        }
        // Augmentation de la vitesse du serpent
        speedUp() {
            this.delay /= 2; // divise le delai par 2
        };
    }           
    // Class Snake
    class Snake {
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
                            if (allowDirection.indexOf(newDirection) > -1) {
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
    // Class Apple
    class Apple {
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
    // Class Drawing
    class Drawing {
        // Game: function qui affiche un message de fin du jeu lorsqu'on a perdu
        static gameOver(ctx, centreX, centreY)  {
            ctx.save();
            ctx.font = "bold 70px sans-serif";
            ctx.fillStyle = "#000"; //  Couleur avec laquelle on va ecrire...
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"; // Position du milieu
            ctx.strokeStyle = "White"; // contour blanc du text
            ctx.lineWidth = 5;
            ctx.strokeText("Game Over", centreX, centreY -180); // attacher au coordonnée du texte
            ctx.fillText("Game Over", centreX, centreY -180 );
            ctx.font = "bold 30px sans-serif"; // appliquer aux txtes en dessous
            ctx.strokeText(`Appuyer sur la touche "Espace" pour rejouer`, centreX, centreY -120 );
            ctx.fillText(`Appuyer sur la touche "Espace" pour rejouer`, centreX, centreY -120 );
            ctx.restore();
        }
    // Affichage du Score
        static drawScore(ctx, centreX, centreY, score) {
            ctx.save();
            ctx.font = "bold 200px sans-serif";
            ctx.fillStyle = "gray"; //  Couleur avec laquelle on va ecrire...
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"; // Position du mileu
            ctx.fillText(score.toString(), centreX, centreY ); // Affiche l'incrementation du Score à cette Position
            ctx.restore();
        }
        // Dessin du serpent    
        static drawSnake (ctx, blockSize, snake){
                ctx.save();
                ctx.fillStyle = "#ff0000"; // la couleur du dessin
                for( let block of snake.body) {
                   this.drawBlock(ctx, block, blockSize);
                }
                ctx.restore();
        } 
        // Dessin du apple
        static drawApple(ctx, blockSize, apple){ 
            const radius = blockSize/2;
            const x = apple.position[0]*blockSize + radius; 
            const y = apple.position[1]*blockSize + radius;

            ctx.save(); // sauve mes paramètres
            ctx.fillStyle = "#33cc33" // couleur du canvas
            ctx.beginPath();
            ctx.arc(x,y, radius, 0, Math.PI*2, true);
            ctx.fill(); // remplir le cercle
            ctx.restore();
        }
        // Dessin du block
        static drawBlock(ctx, position, blockSize){
            const [x,y] = position;
            ctx.fillRect(x* blockSize, y* blockSize, blockSize, blockSize);
        }
    }
     // creation du jeu
     let myGame = new Game();
     myGame.init(); // 

    document.onkeydown = (e) => {
                const key = e.keyCode;
                let newDirection;
                switch (key)  {         
                    case 37:      // numero de la touche de direction de gauche
                    newDirection = "left";
                    break;
                    case 38:     // numero de la touche de direction de haut
                        newDirection = "up";
                    break;
                    case 39:    // numero de la touche de direction de droite
                        newDirection = "right";
                    break;
                    case 40 :    // numero de la touche de direction  d'en-bas    
                        newDirection = "down"; 
                    break;  
                    case 32 :    // numero de la touche Espace     
                        myGame.launch(); 
                        return;  // return pour qu'il sorte de la function
                    default:
                        return;
                }
                myGame.snakee.setDirection(newDirection);
    };
    

}
