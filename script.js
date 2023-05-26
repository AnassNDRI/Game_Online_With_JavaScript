window.onload = function(){ // se lance lorsque la fenetre s'affiche 

    
        const canvasWidth = 900; // Largeur du canvas
        const canvasHeight = 600; // hauteur du canvas
        const blockSize = 30;  // Taille d'un block
        const widthInblocks = canvasWidth/blockSize;  // largeur total de tous les blocks
        const heightInblocks = canvasHeight/blockSize; // Hauteur total de tous les blocks
        const canvas =  document.createElement('canvas');
        ctx = canvas.getContext('2d'); // pour dessiner dans le canvas
        const centreX = canvasWidth / 2;   // centre des X
        const centreY = canvasHeight / 2;  // centre des y 
        let delay;      // Delai
        let snakee;     // constiable d'instaciation d'un neauxeau serpant
        let applee;     // constiable d'instaciation d'une nouvelle Pomme
        let score;
        let timeOut;
        

        const init = () => {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.border = "30px solid gray";
            canvas.style.margin ="50px auto";
            canvas.style.display = "block";
            canvas.style.backgroundColor = "#ddd";
            document.body.appendChild(canvas); // attacher notre canvas à la page html
            launch(); // lance le jeu
        }
         // Cette functio2 n reinialise le jeu et le relance uniquement après  un game over
        const launch = () => { // lancer le jeu
           // if(snakee.checkCollision()){      
                snakee = new Snake([[6,4], [5,4],[4,4],[3,4],[2,4] ], "right"); // initialiser à la meme valeur de depart
                applee = new Apple([10,10]) // reecrée la pomme
                delay = 300; // pour initialiser à la valeur de debut si jamais après la function speedUp
                score = 0;
                clearTimeout(timeOut);
                refreshCanvas(); // se fait à la fin la fonction init     
          //  } 
          }     
        // construction du canvas
        const refreshCanvas = () => { 
       
            snakee.advance();
            if(snakee.checkCollision()){
              gameOver(); 

            } else {
                if(snakee.isEatingApple(applee)){  // verifie si le serpent a mangé une pomme    
                    score++;
                    snakee.eateApple = true;
                    do {
                        applee.setNewPosition();
                    }
                    while(applee.isOnSnake(snakee)) // verifier si la nouvelle pomme est sur 
                                                  // le nouveau serpent
                                                      // si oui il revient donner une nouvelle 
                                                      // dans l'instruction du "do" jusqu'au contraire de l'instruction "do"    
                    if(score % 5 == 0) { // Verification si le score a atteint 5
                      speedUp();
                    }                                  
                }                                      
                ctx.clearRect(0,0,canvasWidth, canvasHeight); // effacer le contenu du canvas
                drawScore(); // affiche le nouveau score à refresh de la page
                snakee.draw();
                applee.draw(); 
                timeOut = setTimeout(refreshCanvas, delay );
            } 
        }
        // Augmentation de la vitesse du serpent
        const speedUp = () => {
            delay = delay /= 2; // divise le delai par 2
        };
        // Game: function qui affiche un message de fin du jeu lorsqu'on a perdu
        const gameOver = () => {
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
          };
          // Affichage du Score
        const drawScore = () => {
            ctx.save();
            ctx.font = "bold 200px sans-serif";
            ctx.fillStyle = "gray"; //  Couleur avec laquelle on va ecrire...
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"; // Position du mileu
            ctx.fillText(score.toString(), centreX, centreY ); // Affiche l'incrementation du Score à cette Position
            ctx.restore();
          }
        // Dessin du block
       const drawBlock = (ctx, position) => {
            const x = position[0] * blockSize;
            const y = position[1] * blockSize;
            ctx.fillRect(x,y, blockSize, blockSize);

        }
        // Class Snake
        class Snake {
            constructor(body, direction) {
                this.body = body;
                this.direction = direction;
                this.eateApple = false ;
            }
              draw(){
                ctx.save();
                ctx.fillStyle = "#ff0000"; // la couleur du dessin
                for( let i = 0; i < this.body.length; i++) {
                   drawBlock(ctx, this.body[i]);
                }
                ctx.restore();
               };
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
               checkCollision(){
                    let wallCollision = false; // toucher le mur ?
                    let snakeCollision = false; // le serpent s'est touché lui même ?
                    const head = this.body[0];
                    const rest = this.body.slice(1);
                    const snakeX = head[0];
                    const snakeY = head[1];
                    const minX = 0;
                    const minY= 0;
                    const maxX = widthInblocks - 1;
                    const maxY=  heightInblocks - 1;
                    const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX; //  mur de gauche ou mur de droit
                    const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; // mur d'en haut ou mur d'en-bas
   
                    if( isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)  { // collision avec un des mur
                       wallCollision = true;
                    }
   
                    for (let i = 0; i < rest.length; i++) {            
                        if(snakeX === rest[i][0] && snakeY === rest[i][1]) {                   
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
            constructor(position) {
                this.position = position;
            }
            draw(){ 
                const radius = blockSize/2;
                const x = this.position[0]*blockSize + radius; 
                const y = this.position[1]*blockSize + radius;
     
                ctx.save(); // sauve mes paramètres
                ctx.fillStyle = "#33cc33" // couleur du canvas
                ctx.beginPath();
                ctx.arc(x,y, radius, 0, Math.PI*2, true);
                ctx.fill(); // remplir le cercle
                ctx.restore();
               };
               // Ajouter une nouvelle position aléatoire à la pomme une fois mangée par le serpent.
            setNewPosition(){ 
                 const newX = Math.round(Math.random() * (widthInblocks - 1)); 
                 const newY = Math.round(Math.random() * (heightInblocks - 1));
                 this.position = [newX, newY];
               };
               // verifier que la pomme ne soit pas sur le serpent
            isOnSnake(snakeTocheck){        
                 let isOnSnake = false;
                 for(let i = 0; i < snakeTocheck.body.length; i++) {          
                    if(this.position[0] === snakeTocheck.body[i][0] && this.position[1] === snakeTocheck.body[i][1])
                    {
                      isOnSnake = true;
                    }
                    return isOnSnake;
                 };
               }
        }  
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
                    launch(); 
                    return;  // return pour qu'il sorte de la function
                default:
                    return;
            }
            snakee.setDirection(newDirection);
        };
        init(); // il peut etre excécuté grace au hosting 

}
