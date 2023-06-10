export default  class Drawing {
     // Class Drawing contenant le methodes 
    //static qui nous permettent d'afficher les choses dans notre canvas
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