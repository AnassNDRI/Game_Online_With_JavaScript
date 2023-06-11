/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Apple)\n/* harmony export */ });\nclass Apple {\r\n    constructor(position =[10,10] ) {\r\n        this.position = position;\r\n    }\r\n    // Ajouter une nouvelle position aléatoire à la pomme une fois mangée par le serpent.\r\n    setNewPosition(widthInblocks, heightInblocks){ \r\n        const newX = Math.round(Math.random() * (widthInblocks - 1)); \r\n        const newY = Math.round(Math.random() * (heightInblocks - 1));\r\n        this.position = [newX, newY];\r\n    };\r\n    // verifier que la pomme ne soit pas sur le serpent\r\n    isOnSnake(snakeTocheck){        \r\n        let isOnSnake = false;\r\n        for(let block of snakeTocheck.body) {          \r\n            if(this.position[0] === block[0] && this.position[1] === block[1])\r\n            {\r\n            isOnSnake = true;2 \r\n            }\r\n            return isOnSnake;\r\n        };\r\n    }\r\n} \n\n//# sourceURL=webpack://game_online_with_javascript/./src/apple.js?");

/***/ }),

/***/ "./src/drawing.js":
/*!************************!*\
  !*** ./src/drawing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Drawing)\n/* harmony export */ });\nclass Drawing {\r\n     // Class Drawing contenant le methodes \r\n    //static qui nous permettent d'afficher les choses dans notre canvas\r\n    // Game: function qui affiche un message de fin du jeu lorsqu'on a perdu\r\n    static gameOver(ctx, centreX, centreY)  {\r\n        ctx.save();\r\n        ctx.font = \"bold 70px sans-serif\";\r\n        ctx.fillStyle = \"#000\"; //  Couleur avec laquelle on va ecrire...\r\n        ctx.textAlign = \"center\";\r\n        ctx.textBaseline = \"middle\"; // Position du milieu\r\n        ctx.strokeStyle = \"White\"; // contour blanc du text\r\n        ctx.lineWidth = 5;\r\n        ctx.strokeText(\"Game Over\", centreX, centreY -180); // attacher au coordonnée du texte\r\n        ctx.fillText(\"Game Over\", centreX, centreY -180 );\r\n        ctx.font = \"bold 30px sans-serif\"; // appliquer aux txtes en dessous\r\n        ctx.strokeText(`Appuyer sur la touche \"Espace\" pour rejouer`, centreX, centreY -120 );\r\n        ctx.fillText(`Appuyer sur la touche \"Espace\" pour rejouer`, centreX, centreY -120 );\r\n        ctx.restore();\r\n    }\r\n// Affichage du Score\r\n    static drawScore(ctx, centreX, centreY, score) {\r\n        ctx.save();\r\n        ctx.font = \"bold 200px sans-serif\";\r\n        ctx.fillStyle = \"gray\"; //  Couleur avec laquelle on va ecrire...\r\n        ctx.textAlign = \"center\";\r\n        ctx.textBaseline = \"middle\"; // Position du mileu\r\n        ctx.fillText(score.toString(), centreX, centreY ); // Affiche l'incrementation du Score à cette Position\r\n        ctx.restore();\r\n    }\r\n    // Dessin du serpent    \r\n    static drawSnake (ctx, blockSize, snake){\r\n            ctx.save();\r\n            ctx.fillStyle = \"#ff0000\"; // la couleur du dessin\r\n            for( let block of snake.body) {\r\n               this.drawBlock(ctx, block, blockSize);\r\n            }\r\n            ctx.restore();\r\n    } \r\n    // Dessin du apple\r\n    static drawApple(ctx, blockSize, apple){ \r\n        const radius = blockSize/2;\r\n        const x = apple.position[0]*blockSize + radius; \r\n        const y = apple.position[1]*blockSize + radius;\r\n\r\n        ctx.save(); // sauve mes paramètres\r\n        ctx.fillStyle = \"#33cc33\" // couleur du canvas\r\n        ctx.beginPath();\r\n        ctx.arc(x,y, radius, 0, Math.PI*2, true);\r\n        ctx.fill(); // remplir le cercle\r\n        ctx.restore();\r\n    }\r\n    // Dessin du block\r\n    static drawBlock(ctx, position, blockSize){\r\n        const [x,y] = position;\r\n        ctx.fillRect(x* blockSize, y* blockSize, blockSize, blockSize);\r\n    }\r\n}\n\n//# sourceURL=webpack://game_online_with_javascript/./src/drawing.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\n/* harmony import */ var _drawing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawing.js */ \"./src/drawing.js\");\n/* harmony import */ var _apple_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apple.js */ \"./src/apple.js\");\n// the Imports\r\n\r\n\r\n\r\n\r\nclass Game {\r\n    constructor () {\r\n        this.canvasWidth = 900; // Largeur du canvas\r\n        this.canvasHeight = 600; // hauteur du canvas\r\n        this.blockSize = 30;  // Taille d'un block\r\n        this.widthInblocks = this.canvasWidth/this.blockSize;  // largeur total de tous les blocks\r\n        this.heightInblocks = this.canvasHeight/this.blockSize; // Hauteur total de tous les blocks\r\n        this.canvas =  document.createElement('canvas');\r\n        this.ctx = this.canvas.getContext('2d'); // pour dessiner dans le canvas\r\n        this.centreX = this.canvasWidth / 2;   // centre des X\r\n        this.centreY = this.canvasHeight / 2;  // centre des y \r\n        this.delay;      // Delai\r\n        this.snakee;     // constiable d'instaciation d'un neauxeau serpant\r\n        this.applee;     // constiable d'instaciation d'une nouvelle Pomme\r\n        this.score;\r\n        this.timeOut;\r\n    }\r\n\r\n    init() {\r\n        this.canvas.width = this.canvasWidth;\r\n        this.canvas.height = this.canvasHeight;\r\n        this.canvas.style.border = \"30px solid gray\";\r\n        this.canvas.style.margin =\"50px auto\";\r\n        this.canvas.style.display = \"block\";\r\n        this.canvas.style.backgroundColor = \"#ddd\";\r\n        document.body.appendChild(this.canvas); // attacher notre canvas à la page html\r\n        this.launch(); // lance le jeu\r\n    }\r\n    // Cette functio2 n reinialise le jeu et le relance uniquement après  un game over\r\n    launch() { // lancer le jeu\r\n     // if(snakee.checkCollision()){      \r\n            this.snakee = new _snake_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"right\", [6,4], [5,4],[4,4],[3,4],[2,4] ); // initialiser à la meme valeur de depart\r\n            this.applee = new _apple_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]() // reecrée la pomme\r\n            this.delay = 300; // pour initialiser à la valeur de debut si jamais après la function speedUp\r\n            this.score = 0;\r\n            clearTimeout(this.timeOut);\r\n            this.refreshCanvas(); // se fait à la fin la fonction init     \r\n    // } \r\n    }     \r\n    // construction du canvas\r\n    refreshCanvas() { \r\n\r\n        this.snakee.advance();\r\n        if(this.snakee.checkCollision(this.widthInblocks, this.heightInblocks)){\r\n        _drawing_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver(this.ctx, this.centreX, this.centreY); \r\n\r\n        } else {\r\n            if(this.snakee.isEatingApple(this.applee)){  // verifie si le serpent a mangé une pomme    \r\n                this.score++;\r\n                this.snakee.eateApple = true;\r\n                do {\r\n                    this.applee.setNewPosition(this.widthInblocks, this.heightInblocks);\r\n                }\r\n                while(this.applee.isOnSnake(this.snakee)) // verifier si la nouvelle pomme est sur \r\n                                            // le nouveau serpent\r\n                                                // si oui il revient donner une nouvelle \r\n                                                // dans l'instruction du \"do\" jusqu'au contraire de l'instruction \"do\"    \r\n                if(this.score % 5 == 0) { // Verification si le score a atteint 5\r\n                    this.speedUp();\r\n                }                                  \r\n            }                                      \r\n            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // effacer le contenu du canvas\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].drawScore(this.ctx, this.centreX, this.centreY, this.score); // affiche le nouveau score à refresh de la page\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].drawSnake(this.ctx, this.blockSize, this.snakee);\r\n            _drawing_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].drawApple(this.ctx, this.blockSize, this.applee); \r\n            this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.delay );\r\n        } \r\n    }\r\n    // Augmentation de la vitesse du serpent\r\n    speedUp() {\r\n        this.delay /= 2; // divise le delai par 2\r\n    };\r\n}  \n\n//# sourceURL=webpack://game_online_with_javascript/./src/game.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\r\n\r\nwindow.onload = () =>{ // se lance lorsque la fenetre s'affiche \r\n \r\n    // Class Game\r\n            \r\n    // Class Snake\r\n   \r\n    // Class Apple\r\n     \r\n   \r\n   \r\n    // creation du jeu\r\n    let myGame = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    myGame.init(); // \r\n\r\n    document.onkeydown = (e) => {\r\n                const key = e.keyCode;\r\n                let newDirection;\r\n                switch (key)  {         \r\n                    case 37:      // numero de la touche de direction de gauche\r\n                    newDirection = \"left\";\r\n                    break;\r\n                    case 38:     // numero de la touche de direction de haut\r\n                        newDirection = \"up\";\r\n                    break;\r\n                    case 39:    // numero de la touche de direction de droite\r\n                        newDirection = \"right\";\r\n                    break;\r\n                    case 40 :    // numero de la touche de direction  d'en-bas    \r\n                        newDirection = \"down\"; \r\n                    break;  \r\n                    case 32 :    // numero de la touche Espace     \r\n                        myGame.launch(); \r\n                        return;  // return pour qu'il sorte de la function\r\n                    default:\r\n                        return;\r\n                }\r\n                myGame.snakee.setDirection(newDirection);\r\n    };\r\n    \r\n\r\n}\r\n\n\n//# sourceURL=webpack://game_online_with_javascript/./src/script.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Snake)\n/* harmony export */ });\nclass Snake {\r\n    constructor(direction, ...body) {\r\n        this.direction = direction;\r\n        this.body = body;\r\n        this.eateApple = false ;\r\n    }\r\n    // Methode qui va permettre à notre serpent d'avancer\r\n    advance(){\r\n        const nextPosition = this.body[0].slice();\r\n        switch (this.direction)\r\n        {\r\n            case \"left\":\r\n                nextPosition[0] -= 1;\r\n                break;\r\n            case \"right\":\r\n                nextPosition[0] += 1;\r\n                break;\r\n            case \"down\":\r\n                nextPosition[1] += 1;\r\n                break;\r\n            case \"up\":\r\n                    nextPosition[1] -= 1; \r\n                break;  \r\n            default:\r\n                throw(\"Invalid Direction\");\r\n        }\r\n        this.body.unshift(nextPosition); // avance d'une position\r\n        if (!this.eateApple) // doit etre\r\n            this.body.pop(); //Supprime le dernier bloc\r\n        else \r\n            this.eateApple = false; // eteinte le boolean eate\r\n        \r\n    };\r\n    // Diriger le serpent\r\n    setDirection(newDirection){\r\n                let allowDirection;\r\n                switch (this.direction){\r\n                    case \"left\":\r\n                    case \"right\":\r\n                        allowDirection = [\"up\", \"down\"];\r\n                        break;\r\n                    case \"down\":\r\n                    case \"up\":\r\n                        allowDirection = [\"left\", \"right\"];\r\n                        break;  \r\n                    default:\r\n                        throw(\"Invalid Direction\");\r\n                    \r\n                }  \r\n                if (allowDirection.includes(newDirection)) {\r\n                    this.direction = newDirection;\r\n                }\r\n    };\r\n    // verifier le cas de collision\r\n    checkCollision(widthInblocks, heightInblocks){\r\n            let wallCollision = false; // toucher le mur ?\r\n            let snakeCollision = false; // le serpent s'est touché lui même ?\r\n            const [head,...rest]= this.body;\r\n            const [snakeX, snakeY] = head;\r\n            const minX = 0;\r\n            const minY= 0;\r\n            const maxX = widthInblocks - 1;\r\n            const maxY=  heightInblocks - 1;\r\n            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX; //  mur de gauche ou mur de droit\r\n            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; // mur d'en haut ou mur d'en-bas\r\n\r\n            if( isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)  { // collision avec un des mur\r\n            wallCollision = true;\r\n            }\r\n\r\n            for (let block of rest) {            \r\n                if(snakeX === block[0] && snakeY === block[1]) {                   \r\n                snakeCollision = true;\r\n                }\r\n            }\r\n\r\n        return wallCollision || snakeCollision;\r\n    };\r\n    // Methode pour manger la pomme \r\n    isEatingApple (appleToEat){          \r\n        const head = this.body[0]; // Déterminer le la tete du snake\r\n        if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])\r\n        //verifie si la tete du serpent est egale aux coordonnées de la pomme\r\n            return true;\r\n                    else\r\n            return false;\r\n    };\r\n}\n\n//# sourceURL=webpack://game_online_with_javascript/./src/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;