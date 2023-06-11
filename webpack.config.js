
 const path = require("path"); // libreria
module.exports = {
entry: "./src/script.js",
output: {
    path: path.resolve(__dirname, "dist"), 
    filename: "bundle.js"
},
    devServer: {
         static : path.resolve(__dirname, "dist"),
         compress: true,
         port:8080,
     },
     mode: 'development',
};