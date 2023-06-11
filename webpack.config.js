
 const path = require("path"); // libreria
module.exports = {
entry: "./src/script.js",
output: {
    path: path.resolve(__dirname, "dist"), 
    filename: "bundle.js"
},
mode: 'development'}