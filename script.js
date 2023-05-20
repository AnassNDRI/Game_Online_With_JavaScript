window.onload = function(){ // se lance lorsque la fenetre s'affiche 

    
        var canvasWidth = 900; // Largeur du canvas
        var canvasHeight = 600; // hauteur du canvas
        var blockSize = 30;  // Taille d'un block
        var ctx;         // contenu
        var delay = 300; // Delai
        var delayIncremet = 200; // Delai
        var snakee;     // variable d'instaciation d'un neauxeau serpant
        var applee;     // Variable d'instaciation d'une nouvelle Pomme
        var widthInblocks = canvasWidth/blockSize;  // largeur total de tous les blocks
        var heightInblocks = canvasHeight/blockSize; // Hauteur total de tous les blocks
        var score;
        var timeOut;
        
        init();

        function init() {
            var canvas =  document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.border = "30px solid gray";
            canvas.style.margin ="50px auto";
            canvas.style.display = "block";
            canvas.style.backgroundColor = "#ddd";
            document.body.appendChild(canvas); // attacher notre canvas à la page html
            ctx = canvas.getContext('2d'); // pour dessiner dans le canvas
            snakee = new Snake([[6,4], [5,4],[4,4],[3,4],[2,4] ], "right");
            applee = new Apple([10,10])
            score = 0; // qui sera augmenté à chaue incrementation de IsEatingApple()
            refreshCanvas(); // se fait à la fin la fonction init
        }
       
        // construction du canvas
        function refreshCanvas(){ 
       
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
                                                      // si oui il reviens donner une nouvelle 
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
        function speedUp() {
            delay = delay /= 2; // divise le delai par 2
        };

        // Game: function qui affiche un message de fin du jeu lorsqu'on a perdu
          function gameOver(){
            ctx.save();
            ctx.font = "bold 70px sans-serif";
            ctx.fillStyle = "#000"; //  Couleur avec laquelle on va ecrire...
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"; // Position du milieu
            ctx.strokeStyle = "White"; // contour blanc du text
            ctx.lineWidth = 5;
            var centreX = canvasWidth / 2;   // centre des X
            var centreY = canvasHeight / 2;  // centre des y
            ctx.strokeText("Game Over", centreX, centreY -180); // attacher au coordonnée du texte
            ctx.fillText("Game Over", centreX, centreY -180 );
            ctx.font = "bold 30px sans-serif"; // appliquer aux txtes en dessous
            ctx.strokeText(`Appuyer sur la touche "Espace" pour rejouer`, centreX, centreY -120 );
            ctx.fillText(`Appuyer sur la touche "Espace" pour rejouer`, centreX, centreY -120 );
            ctx.restore();
          };

          // Cette function reinialise le jeu et le relance uniquement après  un game over
          function restart(){
            if(snakee.checkCollision()){      
                snakee = new Snake([[6,4], [5,4],[4,4],[3,4],[2,4] ], "right"); // initialiser à la meme valeur de depart
                applee = new Apple([10,10]) // reecrée la pomme
                delay = 300; // pour initialiser à la valeur de debut si jamais après la function speedUp
                score = 0;
                clearTimeout(timeOut);
                refreshCanvas(); // se fait à la fin la fonction init     
            } 
          }      

          // Affichage du Score
          function drawScore(){
            ctx.save();
            ctx.font = "bold 200px sans-serif";
            ctx.fillStyle = "gray"; //  Couleur avec laquelle on va ecrire...
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"; // Position du mileu
            var centreX = canvasWidth / 2;   // centre des X
            var centreY = canvasHeight / 2;  // centre des y
            ctx.fillText(score.toString(), centreX, centreY ); // Affiche l'incrementation du Score à cette Position
            ctx.restore();
          }

          // Dessin du block
        function drawBlock(ctx, position){
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            ctx.fillRect(x,y, blockSize, blockSize);

        }

        function Snake(body, direction) {
            this.body = body;
            this.direction = direction;
            this.eateApple = false ;
            this.draw = function() {
             ctx.save();
             ctx.fillStyle = "#ff0000"; // la couleur du dessin
             for( var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
             }
             ctx.restore();
            };
            
            this.advance = function() {
                var nextPosition = this.body[0].slice();
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

            
            this.setDirection = function(newDirection){
                     var allowDirection;
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
            this.checkCollision = function () {
                 var wallCollision = false; // toucher le mur ?
                 var snakeCollision = false; // le serpent s'est touché lui même ?
                 var head = this.body[0];
                 var rest = this.body.slice(1);
                 var snakeX = head[0];
                 var snakeY = head[1];
                 var minX = 0;
                 var minY= 0;
                 var maxX = widthInblocks - 1;
                 var maxY=  heightInblocks - 1;
                 var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX; //  mur de gauche ou mur de droit
                 var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; // mur d'en haut ou mur d'en-bas

                 if( isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)  { // collision avec un des mur
                    wallCollision = true;
                 }

                 for (var i = 0; i < rest.length; i++) {            
                     if(snakeX === rest[i][0] && snakeY === rest[i][1]) {                   
                        snakeCollision = true;
                     }
                 }

                return wallCollision || snakeCollision;
            };
            // Methode pour manger la pomme 
            this.isEatingApple = function(appleToEat) {          
                var head = this.body[0]; // Déterminer le la tete du snake
                if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                //verifie si la tete du serpent est egale aux coordonnées de la pomme
                    return true;
                           else
                    return false;
            };
        }
        
        // la pomme du serpent
        function Apple(position)  {      
          this.position = position;
          this.draw = function () {      
           ctx.save(); // sauve mes paramètres
           ctx.fillStyle = "#33cc33" // couleur du canvas
           ctx.beginPath();
           var radius = blockSize/2;
           var x = this.position[0]*blockSize + radius; 
           var y = this.position[1]*blockSize + radius;
           ctx.arc(x,y, radius, 0, Math.PI*2, true);
           ctx.fill(); // remplir le cercle
           ctx.restore();
          };

          // Ajouter une nouvelle pomme à une nouvelle position aléatoire une fois mangée par le serpent.
          this.setNewPosition = function() { 
            var newX = Math.round(Math.random() * (widthInblocks - 1)); 
            var newY = Math.round(Math.random() * (heightInblocks - 1));
            this.position = [newX, newY];
          };

          // verifier que la pomme ne soit pas sur le serpent
          this.isOnSnake = function(snakeTocheck) {        
            var isOnSnake = false;
            for(i = 0; i < snakeTocheck.body.length; i++) {          
               if(this.position[0] === snakeTocheck.body[i][0] && this.position[1] === snakeTocheck.body[i][1])
               {
                 isOnSnake = true;
               }
               return isOnSnake;
            };
          }
        }
        
        document.onkeydown = function handlekeyDown(e) {
            var key = e.keyCode;
            var newDirection;
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
                    restart(); 
                    return;  // return pour qu'il sorte de la function
                default:
                    return;
            }
            snakee.setDirection(newDirection);
        };

}
