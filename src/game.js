// the Imports
import Snake from "./snake.js";
import Drawing from "./drawing.js";
import Apple from "./apple.js";

export default class Game {
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