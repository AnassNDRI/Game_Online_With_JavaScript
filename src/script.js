import Game from "./game.js";

window.onload = () =>{ // se lance lorsque la fenetre s'affiche 
 
    // Class Game
            
    // Class Snake
   
    // Class Apple
     
   
   
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
